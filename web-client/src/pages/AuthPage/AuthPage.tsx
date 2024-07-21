import React, { useRef, useState } from "react";
import { BackgroundCircles } from "../../common/DesignHero";

import useToast from "../../hooks/useToast";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import GoogleLoginButton from "./components/GoogleLoginButton";

export default function AuthPage() {
  const parallaxRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();

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
        .catch((err) =>
          toast.error({ title: err || "Error : Something bad happened" })
        )
        .finally(() => {
          setLoading(false);
          navigate("/");
        });
    } else {
      auth
        .login(form.email, form.password)
        .catch((err) =>
          toast.error({
            title: err.message || "Error : Something bad happened",
          })
        )
        .finally(() => {
          setLoading(false);
          navigate("/");
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
        <div className=" relative h-screen flex items-center justify-center mobile:max-w-[25rem] mx-auto widescreen:max-w-5xl -mb-[10rem] mt-[20rem]">
          <div className="relative z-1 widescreen:w-[60%] mobile:w-full flex-col bg-black-3 p-8 rounded-2xl gap-y-10 -top-[15rem]">
            <div className="flex items-center justify-center">
              <img
                src={"/images/brain.svg"}
                alt="logo"
                className=" w-12 h-12"
              />
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col gap-y-8"
            >
              {isSignUp && (
                <label className="flex flex-col">
                  <span className="text-back font-medium mb-4">Full Name</span>
                  <input
                    type="text"
                    name="name"
                    required={true}
                    minLength={3}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                  />
                </label>
              )}
              <label className="flex flex-col">
                <span className="text-back font-medium mb-4">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  required={true}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-back font-medium mb-4">Password</span>
                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  required={true}
                  minLength={8}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                  placeholder="Enter Password"
                  className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
                />
              </label>
              {isSignUp && (
                <label className="flex flex-col">
                  <span className="text-back font-medium mb-4">
                    Confirm Password
                  </span>
                  <input
                    type="password"
                    name="confirmpassword"
                    required={true}
                    minLength={8}
                    value={form.confirmpassword}
                    onChange={(e) =>
                      setForm({ ...form, [e.target.name]: e.target.value })
                    }
                    placeholder="Confirm New Password"
                    className="bg-black-1 py-4 px-6 placeholder:text-secondary text-back rounded-lg outline-none border-none focus-visible:ring-primary focus-visible:ring-1 caret-primary font-medium"
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
          <div className="absolute  -top-[54%] left-[45%] widescreen:left-[48%] w-[234%] -translate-x-1/2 widescreen:w-[138%] widescreen:-top-[90%]">
            <img src={"/images/hero-background.jpg"} className="" alt="hero" />
          </div>
          <BackgroundCircles top={"-20rem"} />
        </div>
      </div>
    </section>
  );
}
