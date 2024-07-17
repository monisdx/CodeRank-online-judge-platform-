import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import api, { isAuthTokenPresent } from "../utils/api";
import { useAuth } from "../contexts/authContext";

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const isAuth = isAuthTokenPresent();
  const navigate = useNavigate();
  const f = useAuth();

  return (
    <nav className="p-page w-full flex py-5 justify-evenly items-center z-[999] bg-black-8 border-black-6 border-b-2">
      <Link to="/" className="flex items-center gap-4 cursor-pointer">
        <img src={"/images/brain.svg"} alt="logo" className=" w-9 h-9" />
        <p className="text-back font-bold text-lg font-raleway">CodeMaster</p>
      </Link>

      <div className="list-none widescreen:flex hidden justify-center items-center gap-x-20 flex-1">
        {navLinks.map((item, key) => (
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
        <div className="widescreen:flex hidden items-center justify-center bg-back p-[0.1rem] rounded-3xl">
          <button
            onClick={() => {
              api.auth.logout().finally(() => {});
            }}
            className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-8 bg-back outline-none border-4 border-black-8"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="widescreen:flex hidden items-center justify-center bg-back p-[0.1rem] rounded-3xl">
          <Link
            to={"/auth"}
            className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-8 bg-back outline-none border-4 border-black-8"
          >
            Sign In
          </Link>
        </div>
      )}

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
              <div className="flex items-center justify-center bg-back p-[0.1rem] rounded-3xl">
                <button
                  onClick={() => {
                    api.auth.logout().finally(() => navigate("/"));
                  }}
                  className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-8 bg-back outline-none border-4 border-black-8"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center bg-back p-[0.1rem] rounded-3xl">
                <Link
                  to={"/auth"}
                  className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-8 bg-back outline-none border-4 border-black-8"
                >
                  Sign In
                </Link>
              </div>
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
];
