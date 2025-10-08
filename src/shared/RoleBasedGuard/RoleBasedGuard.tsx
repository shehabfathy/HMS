import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const getToken = () => cookies.get("token");

interface DecodedToken {
  // IMPORTANT: Make sure this matches the payload of your JWT
  role: string;
}

const RoleBasedGuard = ({ children }: { children: ReactNode }) => {
  const token = getToken();
  const location = useLocation();

  // --- Start of Logic ---
  console.log("--- RoleBasedGuard Check ---");
  console.log("Current Path:", location.pathname);
  console.log("Token Found:", token ? "Yes" : "No");

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);

      // DEBUG: This will show you the entire content of your token
      console.log("Decoded Token Payload:", decodedToken);

      const userRole = decodedToken.role;

      // DEBUG: This shows the specific role the code is reading
      console.log("User Role Found:", userRole);

      // Rule 1: Handle ADMIN users
      if (userRole === "admin") {
        console.log("Decision: User is ADMIN, redirecting to /dashboard.");
        return <Navigate to="/dashboard" replace />;
      }

      // Rule 2: Handle NON-ADMIN users
      // This is the logic that restricts them to the landing page
      if (userRole !== "admin" && location.pathname !== "/") {
        console.log(
          "Decision: User is NOT ADMIN and is NOT on landing page. Redirecting to /."
        );
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.error("Token is invalid or expired. Treating as guest.", error);
    }
  }

  console.log("Decision: Allowing access.");
  // Allow access if:
  // 1. User is a guest (no token)
  // 2. User is a non-admin and is on the landing page ('/')
  // 3. Token is invalid (logged out)
  return <>{children}</>;
};

export default RoleBasedGuard;
