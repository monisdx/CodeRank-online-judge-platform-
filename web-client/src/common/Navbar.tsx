import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import api, { isAuthTokenPresent } from "../utils/api";
import { useAuth } from "../contexts/authContext";
import { twMerge } from "tailwind-merge";

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const isAuth = isAuthTokenPresent();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user?.picture);
  return (
    <nav className="p-page w-full flex py-5 justify-evenly items-center z-[999] bg-black-8 border-black-6 border-b-2">
      <Link to="/" className="flex items-center gap-4 cursor-pointer">
        <img src={"/images/brain.svg"} alt="logo" className=" w-9 h-9" />
        <p className="text-back font-bold text-lg font-raleway">CodeMaster</p>
      </Link>
      <div className="widescreen:flex hidden justify-center items-center gap-x-20 flex-1">
        {navLinks.slice(0, 3).map((item, key) => (
          <Link
            key={key}
            to={item.to}
            className={`font-cabin font-medium cursor-pointer text-md text-back/50 hover:text-back duration-300`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {isAuth ? (
        <button
          onClick={() => setProfile(!profile)}
          className="widescreen:flex relative hidden items-center justify-center gap-x-2 bg-primary font-cabin px-4 py-2 font-medium text-back rounded-lg"
        >
          {user?.picture ? (
            <figure className="flex items-center justify-center rounded-full w-6 h-6">
              <img
                src={user?.picture}
                alt="logo"
                className="w-full h-full rounded-full"
              />
            </figure>
          ) : (
            <Icon icon="person" className="text-3xl" />
          )}
          <span>{user?.name.split(" ")[0]}</span>

          <div
            className={twMerge(
              "top-full right-0 absolute flex flex-col gap-y-4 bg-black-8 min-w-[15rem] rounded-xl  border-black-6 border-2 duration-150 mt-3 p-2 z-[999]",
              profile ? "scale-100" : "scale-0"
            )}
          >
            <p className=" flex flex-col items-start text-cabin font-medium border-b-2 border-b-black-6">
              <span className="text-back">{user?.name}</span>
              <span className="text-secondary">{user?.email}</span>
            </p>
            <Link
              className="flex items-center gap-x-2 text-back/50 hover:text-back duration-300 font-cabin font-medium"
              to={"/submission"}
            >
              <Icon icon="submission" className="text-2xl" />
              Submissions
            </Link>
            <button
              onClick={() => {
                api.auth.logout();
              }}
              className="flex items-center gap-x-2 text-back/50 hover:text-back duration-300 font-cabin font-medium"
            >
              <Icon className="text-2xl" icon="logout" />
              Log Out
            </button>
          </div>
        </button>
      ) : (
        <Link
          to={"/auth"}
          className="widescreen:flex hidden px-5 py-2 font-medium font-cabin text-md rounded-xl text-back bg-primary outline-none border-none"
        >
          Sign In
        </Link>
      )}
      {/* mobileNav */}
      <div className="widescreen:hidden flex flex-1 justify-end items-center z-[999]">
        <button className="relative" onClick={() => setMobileNav(!mobileNav)}>
          <Icon
            icon={mobileNav ? "close" : "menu"}
            className="text-[1.8rem] text-back"
          />
        </button>
        <div
          className={`${mobileNav ? "flex" : "hidden"} p-6 bg-black-8 absolute top-20 right-0 mx-4 my-2 min-w-[12rem] rounded-xl sidebar border-black-6 border-2`}
        >
          <div className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((item, key) => (
              <Link
                key={key}
                to={item.to}
                className={`font-cabin font-medium cursor-pointer text-md text-back/50 hover:text-back mb-4 duration-300`}
              >
                {item.title}
              </Link>
            ))}
            {isAuth ? (
              <button
                onClick={() => {
                  api.auth.logout();
                }}
                className="flex items-center gap-x-2 text-back/50 hover:text-back duration-300 font-cabin font-medium"
              >
                <Icon className="text-2xl" icon="logout" />
                Log Out
              </button>
            ) : (
              <Link
                to={"/auth"}
                className="flex px-5 py-2 font-medium font-cabin text-md rounded-xl text-back bg-primary outline-none border-none"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export const navLinks = [
  {
    to: "/",
    id: "home",
    title: "Home",
  },
  {
    to: "#contact",
    id: "contact us",
    title: "Contact Us",
  },
  {
    to: "/problems",
    id: "problem",
    title: "Problems",
  },
  {
    to: "/submission",
    id: "submission",
    title: "Submissions",
  },
];
