import { RouterProvider } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/globalContext";
import router from "./pages/router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContextProvider } from "./contexts/authContext";

const googleOauthClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || "";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={googleOauthClientId}>
      <GlobalContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </GlobalContextProvider>
    </GoogleOAuthProvider>
  );
}
