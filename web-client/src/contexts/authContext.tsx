import { createContext, useContext, useEffect, useRef, useState } from "react";
import { User } from "../types";
import {
  getTokenFromLocalStorage,
  parseJwt,
  saveTokenToLocalStorage,
} from "../utils";
import api, { setJwt } from "../utils/api";
import useRefreshComponent from "../hooks/useRefreshComponent";
import useToast from "../hooks/useToast";

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (data: { code: string }) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  user: User | undefined;
  authenticated: boolean;
  verified: boolean;
  otp: {
    request: () => void;
    verify: (code: string) => void;
    getWaitTime: () => number;
  };
  fetchUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const otpRequestTimeout = 5 * 60 * 1000;

export function AuthContextProvider(props: { children: React.ReactNode }) {
  const flag = useRef(false);
  const OTPsentAt = useRef(-1);
  const temporaryAccessToken = useRef("");

  const [user, setUser] = useState<User>();
  const [authenticated, setAuthenticated] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshComponent = useRefreshComponent();
  const toast = useToast();

  async function fetchUser() {
    if (authenticated) {
      const userResponse = await api.user.getCurrentUser();
      if (userResponse) setUser(userResponse.user);
    }
  }

  async function login(email: string, password: string) {
    const success = await api.auth
      .login(email, password)
      .catch((err) => toast.error({ title: err || "something went wrong" }));
    if (!success) return;

    if (success.verified) {
      setVerified(true);
      saveTokenToLocalStorage(success.token);
      localStorage.removeItem("mixr-lastOTPtimer");
    } else {
      temporaryAccessToken.current = success.token;
    }

    setAuthenticated(true);
    setTimeout(() => {
      refreshComponent.byId("page");
    }, 10);
  }

  async function register(
    name: string,
    email: string,
    password: string,
  ) {
    const success = await api.auth
      .register(name, email, password, referralCode)
      .catch((err) => toast.error({ title: err || "something went wrong" }));
    if (!success) return;

    temporaryAccessToken.current = success.token;

    setAuthenticated(true);
    setTimeout(() => {
      refreshComponent.byId("page");
    }, 10);
  }

  async function signInWithGoogle({ code }: { code: string }) {
    const success = await api.auth
      .loginWithGoogle(code)
      .catch((err) => toast.error({ title: err || "something went wrong" }));
    if (!success) return;

    setVerified(true);
    saveTokenToLocalStorage(success.token);
    localStorage.removeItem("mixr-lastOTPtimer");

    setAuthenticated(true);
    setTimeout(() => {
      refreshComponent.byId("page");
    }, 10);
  }

  const otp = {
    request() {
      if (OTPsentAt.current + otpRequestTimeout < Date.now()) {
        const prevTimer = OTPsentAt.current;
        localStorage.setItem("mixr-lastOTPtimer", Date.now().toString());
        OTPsentAt.current = Date.now();
        api.auth
          .generateVerificationCode()
          .then((res) => {
            res
              ? toast.display({ title: res })
              : toast.error({ title: "Unkown Error while sending email" });
          })
          .catch((err) => {
            toast.error(err);
            OTPsentAt.current = prevTimer;
            localStorage.setItem("mixr-lastOTPtimer", prevTimer.toString());
          });
      }
    },

    getWaitTime() {
      return Math.max(OTPsentAt.current + otpRequestTimeout - Date.now(), 0);
    },

    verify(code: string) {
      api.auth
        .verify(code)
        .then((res) => {
          res
            ? toast.display({ title: "Successfully verified" })
            : toast.error({ title: "Unkown Error while verifying OTP" });

          if (res) {
            temporaryAccessToken.current &&
              saveTokenToLocalStorage(temporaryAccessToken.current);
            fetchUser();
            setVerified(true);
          }
        })
        .catch((err) => toast.error(err));
    },
  };

  useEffect(() => {
    if (!flag.current) {
      setAuthenticated(false);
      const localToken = getTokenFromLocalStorage();
      if (localToken) {
        if (Number(parseJwt(localToken).exp) < Date.now() / 1000) {
          api.auth.logout();
        }
        setJwt(localToken);
        setAuthenticated(true);
        setVerified(true);
      }

      const storedOTPsentAt = localStorage.getItem("mixr-lastOTPtimer");
      if (storedOTPsentAt) OTPsentAt.current = Number(storedOTPsentAt);

      flag.current = true;

      setTimeout(() => {
        setLoading(false);
      }, 10);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [authenticated]);

  const value: AuthContextType = {
    login,
    register,
    user,
    authenticated,
    verified,
    otp,
    fetchUser,
    loading,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
