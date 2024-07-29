import React from "react";
import api from "../../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../../common/Icon";

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="p-page w-full flex py-5 justify-between items-center z-[999] bg-black-1 border-b-black-2 border-b ">
      <Link to="/" className=" relative flex items-center gap-4 cursor-pointer">
        <img src={"/images/brain.svg"} alt="logo" className=" w-9 h-9" />
        <h1 className="text-back font-bold text-lg font-inter">CodeMaster</h1>
        <p className="text-xs font-medium text-back font-inter absolute top-[2rem] right-[0.1rem]">
          admin
        </p>
      </Link>

      <button
        onClick={() => {
          api.auth.logout();
        }}
        className="flex px-5 py-2 items-center gap-x-2 bg-primary text-back  rounded-xl font-cabin font-medium"
      >
        <Icon className="text-2xl" icon="logout" />
        Log Out
      </button>
    </nav>
  );
}
