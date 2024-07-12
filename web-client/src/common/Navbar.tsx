import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState<boolean>(false);

  return (
    <nav className="p-page w-full flex py-5 justify-between items-center z-[999] bg-black-3 ">
      <Link to="/" className="flex items-center gap-4 cursor-pointer">
        <img src={"/images/logo.svg"} alt="logo" className=" w-9 h-9" />
        <p className="text-back font-bold text-lg font-raleway">CodeMaster</p>
      </Link>
      <div className="flex gap-10">
        <ul className="list-none widescreen:flex hidden justify-end items-center gap-x-8 flex-1">
          {navLinks.map((item, key) => (
            <Link
              key={key}
              to={item.to}
              className={`font-cabin font-medium cursor-pointer text-md text-back ${key === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            >
              {item.title}
            </Link>
          ))}
        </ul>
       
      </div>
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
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((item, key) => (
              <Link
                key={key}
                to={item.to}
                className={`font-cabin font-medium cursor-pointer text-md text-back ${key === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
              >
               {item.title}
              </Link>
            ))}
          </ul>
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
