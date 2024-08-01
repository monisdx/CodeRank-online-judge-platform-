import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
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
    if (location.hash) {
      document
        .querySelector(`section${location.hash}`)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <main className="relative">
      <Modal />
      <Toasts />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
