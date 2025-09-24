// src/shared/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import CookieService from "../../service/Cookies/Cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // 👇 2. Get the token from cookies instead of localStorage
  const token = CookieService.get("token");

  if (!token) {
    // If there's no token, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the child components.
  return <>{children}</>;
};

export default ProtectedRoute;
