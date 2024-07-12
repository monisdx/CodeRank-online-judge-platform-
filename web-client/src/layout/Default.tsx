import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import Toasts from "../common/Toasts";


export default function Default() {
  const [flag, setFlag] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, Math.random() * 1000);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <main className="relative">
      {/* <article
        className={twMerge(
          "fixed z-[99999] flex h-full w-full flex-col items-center justify-center gap-y-4 bg-background opacity-100 duration-300",
          flag && "pointer-events-none opacity-0"
        )}
      >
        <img className="w-[40vw]" src="/logo.svg" alt="mixr" />
        <h1 className="font-redRose text-4xl font-medium drop-shadow-md mobile:text-center">
          Discover Countless Gems & New Brands
        </h1>
      </article> */}

      <Modal />
      <Toasts />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
