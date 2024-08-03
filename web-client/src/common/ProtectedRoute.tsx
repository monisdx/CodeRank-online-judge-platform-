import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useQueryParams from "../hooks/useQueryParams";
import Loader from "./Loader";

export enum ProtectedTypes {
  PRIVATEONLY,
  PUBLICONLY,
  ADMINONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
  fallbackUrl?: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { authenticated, loading, user } = useAuth();

  const query = useQueryParams();
  const { pathname } = useLocation();

  const redirectUrl = props.fallbackUrl || query.get("redirectUrl");

  console.log("User", user);
  console.log(authenticated, loading);

  if (props.type === ProtectedTypes.PRIVATEONLY) {
    return (
      <>
        {!loading && (
          <>
            {authenticated ? (
              <Outlet />
            ) : (
              <Navigate to={`/auth?redirectUrl=${pathname}`} />
            )}
          </>
        )}
      </>
    );
  }

  if (props.type === ProtectedTypes.PUBLICONLY) {
    console.log("kk");
    return (
      <>
        {!loading && (
          <>
            {!authenticated ? <Outlet /> : <Navigate to={redirectUrl || "/"} />}
          </>
        )}
      </>
    );
  }

  if (props.type === ProtectedTypes.ADMINONLY) {
    return (
      <>
        {!loading && (
          <>
            {authenticated ? (
              <>
                {user &&
                  (user.isadmin ? (
                    <Outlet />
                  ) : (
                    <Navigate to={`/auth?redirectUrl=${pathname}`} />
                  ))}
                {!user && (
                  <div className="flex flex-col justify-center items-center min-h-screen">
                    <Loader className="w-1/5" />
                  </div>
                )}
              </>
            ) : (
              <Navigate to={`/auth?redirectUrl=${pathname}`} />
            )}
          </>
        )}
      </>
    );
  }

  return <Navigate to="/" />;
}
