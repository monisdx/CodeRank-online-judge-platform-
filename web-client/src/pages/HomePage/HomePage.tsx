import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { useAuth } from "../../contexts/authContext";

export default function HomePage() {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
