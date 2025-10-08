import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const getToken = () => cookies.get("token");

const AuthenticatedRoute = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const location = useLocation();

  // If the user is NOT logged in, redirect them to the login page
  if (!token) {
    // We save the original location so we can redirect them back after they log in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, show the page
  return <>{children}</>;
};

export default AuthenticatedRoute;
