import React, { useRef, useState } from "react";
import { BackgroundCircles } from "../../common/DesignHero";

import useToast from "../../hooks/useToast";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import GoogleLoginButton from "./components/GoogleLoginButton";
import Icon from "../../common/Icon";

export default function AuthPage() {
  const parallaxRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const [error, setError] = useState(null);

  console.log(auth);
  console.log(auth.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [showpassword, setshowpassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      auth
        .register(form.name, form.email, form.password, form.confirmpassword)
        .finally(() => {
          setLoading(false);
        });
    } else {
      auth.login(form.email, form.password).finally(() => {
        setLoading(false);
      });
    }
  }

  function switchmode() {
    setIsSignUp(!isSignUp);
    setForm({ name: "", email: "", password: "", confirmpassword: "" });
  }

  return (
    <section className="p-page overflow-hidden bg-black-8">
      <div className="relative" ref={parallaxRef}>
        <div className=" relative h-screen flex items-center justify-center mobile:max-w-[25rem] mx-auto widescreen:max-w-5xl -mb-[20rem] mt-[20rem]">
          <div className="relative z-1 widescreen:w-[50%] mobile:w-full flex-col bg-black-3 p-8 rounded-2xl -top-[21rem]">
            <div className="flex items-center justify-center">
              <img
                src={"/images/brain.svg"}
                alt="logo"
                className=" w-12 h-12"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-y-6"
            >
              {isSignUp && (
                <label className="flex flex-col relative">
                  <Icon
                    icon="person"
                    className="absolute inset-y-1/2 -translate-y-1/2 left-4 text-secondary text-2xl"
                  />
                  <input
                    type="text"
                    name="name"
                    required={true}
                    minLength={3}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                    placeholder="John Doe"
                    className="bg-black-1 py-4 px-6 pl-12 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                  />
                </label>
              )}
              <label className="flex flex-col relative">
                <Icon
                  icon="mail"
                  className="absolute inset-y-1/2 -translate-y-1/2 left-4 text-secondary text-2xl"
                />
                <input
                  type="email"
                  name="email"
                  required={true}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  placeholder="johndoe@gmail.com"
                  className="bg-black-1 py-4 px-6 pl-12 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                />
              </label>
              <label className="flex flex-col relative">
                <Icon
                  icon="key"
                  className="absolute inset-y-1/2 -translate-y-1/2 left-4 -rotate-45 text-secondary text-2xl"
                />
                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  required={true}
                  minLength={8}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  placeholder="••••••••••"
                  className="bg-black-1 py-4 px-12 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                />
                <button
                  type="button"
                  onClick={() => setshowpassword(!showpassword)}
                  disabled={!form.password.length}
                  className="absolute inset-y-0 right-2 my-auto disabled:pointer-events-none disabled:opacity-50"
                >
                  <Icon
                    icon={showpassword ? "visibilityOff" : "visibility"}
                    className="text-secondary text-2xl"
                  />
                </button>
              </label>
              {isSignUp && (
                <label className="flex flex-col relative">
                  <Icon
                    icon="key"
                    className="absolute inset-y-1/2 -translate-y-1/2 left-4 -rotate-45 text-secondary text-2xl"
                  />
                  <input
                    type="password"
                    name="confirmpassword"
                    required={true}
                    minLength={8}
                    value={form.confirmpassword}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                    placeholder="••••••••••"
                    className="bg-black-1 py-4 px-6 pl-12 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                  />
                </label>
              )}

              <button
                type="submit"
                disabled={loading}
                className={twMerge(
                  "bg-primary hover:bg-primary/70 py-3 px-8 rounded-xl outline-none w-full text-back font-medium disabled:cursor-not-allowed disabled:animate-pulse"
                )}
              >
                <span>Continue</span>
              </button>
            </form>
            <figure className="flex justify-center items-center gap-x-2 my-4">
              <div className="h-[0.05rem] w-full bg-back/50" />
              <p className="font-inter text-back/50 text-xs font-black-2 font-medium">
                OR
              </p>
              <div className="h-[0.05rem] w-full bg-back/50" />
            </figure>
            <GoogleLoginButton
              className={twMerge(
                "flex items-center justify-center gap-x-4 bg-black-3 hover:bg-black-1 duration-300 py-3 px-8 rounded-xl outline-none border-2 border-black-2 w-full text-back font-medium disabled:cursor-not-allowed disabled:animate-pulse"
              )}
            >
              <img src="/images/google.svg" alt="google logo" className="h-6" />
              Continue with Google
            </GoogleLoginButton>
            <div className="flex justify-center items-center mt-4">
              <button
                className=" px-4 py-2 font-medium text-base text-back rounded-xl cursor-pointer  outline-none border-none"
                onClick={switchmode}
              >
                {isSignUp ? (
                  <p>
                    Already have an account?{" "}
                    <span className="text-primary">Sign In</span>
                  </p>
                ) : (
                  <p>
                    Dont't have an account?{" "}
                    <span className="text-primary">Sign Up</span>
                  </p>
                )}
              </button>
            </div>
          </div>
          <div className="absolute  -top-[54%] left-[50%] widescreen:left-[50%] w-[234%] -translate-x-1/2 widescreen:w-[138%] widescreen:-top-[90%]">
            <img src={"/images/hero-background.jpg"} className="" alt="hero" />
          </div>
          <BackgroundCircles top={"-20rem"} />
        </div>
      </div>
    </section>
  );
}
