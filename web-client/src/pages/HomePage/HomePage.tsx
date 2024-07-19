import Hero from "./components/Hero";
import Contact from "./components/Contact";
import { useAuth } from "../../contexts/authContext";
import { getTokenFromLocalStorage } from "../../utils";

export default function HomePage() {
  const auth = useAuth();
  console.log(auth);
  // const t = localStorage.getItem("codemaster_JWT_stored");
  // let user = null;
  // let token = "";
  // if (t) {
  //   token = JSON.parse(t).token;
  // }
  // if (token) {
  //   user = JSON.parse(token);
  // }
  // console.log(token);
  // console.log(user);

  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
