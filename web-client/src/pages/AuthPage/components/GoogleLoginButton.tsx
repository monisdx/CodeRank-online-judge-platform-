import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import useToast from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton(props: {
  children?: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();  
  const toast = useToast();  
  const [code, setCode] = useState<string | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setCode(tokenResponse.access_token);
    },
    
    onError:()=>{
        toast.error({title:"Something went wrong"});
    }
  });
  
  const auth = useAuth();

  useEffect(() => {
    if (!code) return;

    auth.signInWithGoogle(code)
    .finally(()=>navigate("/"));

  }, [code]);

  return (
    //  @ts-ignore
    <button className={props.className} onClick={login}>
      {props.children}
    </button>
  );
}
