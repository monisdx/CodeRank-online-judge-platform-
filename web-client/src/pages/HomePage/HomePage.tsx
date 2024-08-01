import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { useAuth } from "../../contexts/authContext";
import { getTokenFromLocalStorage, parseJwt } from "../../utils";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
