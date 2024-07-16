import React from 'react'
import api from '../../../utils/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
  return (
    <nav className="p-page w-full flex py-5 justify-between items-center z-[999] bg-black-1 ">
      <Link to="/" className=" relative flex items-center gap-4 cursor-pointer">
        <img src={"/images/brain.svg"} alt="logo" className=" w-9 h-9" />
        <h1 className="text-back font-bold text-lg font-inter">CodeMaster</h1>
        <p className="text-xs font-medium text-back font-inter absolute top-[2rem] right-[0.1rem]">admin</p>
      </Link>
        <div className="flex items-center justify-center bg-back p-[0.1rem] rounded-3xl">
          <button 
          onClick={()=> {
            api.auth.logout()
            .finally(()=> navigate('/'));
          }}
          className="flex px-5 py-2 font-medium font-cabin text-md rounded-3xl text-black-8 bg-back outline-none border-4 border-black-8">
            Log Out
          </button>
        </div>
    </nav>
  )
}