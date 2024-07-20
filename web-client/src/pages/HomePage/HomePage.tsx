import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { useAuth } from "../../contexts/authContext";
import { getTokenFromLocalStorage, parseJwt } from "../../utils";

export default function HomePage() {
  const auth = useAuth();
  console.log(auth);
  const localToken = getTokenFromLocalStorage();
  console.log(localToken);
  if (localToken) {
    console.log(parseJwt(localToken));
  }

  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
