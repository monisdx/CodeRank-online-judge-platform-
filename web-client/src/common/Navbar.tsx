import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);

  return (
    <nav className="p-page w-full flex py-5 justify-evenly items-center z-[999] bg-black-8 border-black-6 border-b ">
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
        <button type="button" className="widescreen:flex hidden px-5 py-2 font-medium text-md font-cabin rounded-3xl text-black-1 bg-back outline-none border-none">
         Sign In
        </button>
      <div className="widescreen:hidden flex flex-1 justify-end items-center">
      <button
            className="relative"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <Icon icon={mobileNav ? "close" : "menu"} className="text-[1.8rem] text-back" />
          </button>
        <div
          className={`${mobileNav ? "flex" : "hidden"} p-6 bg-black-3 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar border-black-2 border-2`}
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
            <button type="button" className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-1 bg-back outline-none border-none">
              Sign In
            </button>
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
    to:"#contact",
    id: "contact us",
    title: "Contact Us",
  },
  {
    to: "/problems",
    id: "problem",
    title: "Problems",
  },
];
