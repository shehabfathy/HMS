import { useEffect, useState, useCallback } from "react"; // 1. Import useCallback
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { AuthContext } from "./AuthContext";

type LoginData = {
  _id: string;
  role: "admin" | "user";
  verified: boolean;
  iat: number;
  exp: number;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const navigate = useNavigate();

  // 2. Wrap logOut in useCallback since getUser depends on it.
  // The 'navigate' function is guaranteed to be stable.
  const logOut = useCallback(() => {
    Cookies.remove("token");
    setLoginData(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  // 3. Wrap getUser in useCallback.
  // It depends on logOut, so we add logOut to its dependency array.
  const getUser = useCallback(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded: LoginData = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          toast.error("Session expired. Please log in again.");
          logOut();
        } else {
          setLoginData(decoded);
        }
      } catch (error) {
        const err = error as { message: string };
        toast.error(err.message || "Invalid token");
        logOut();
      }
    }
  }, [logOut]); // Now getUser is stable

  // 4. Now it's safe to add getUser to the dependency array.
  // This effect will now only run once when the component mounts.
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <AuthContext.Provider value={{ loginData, logOut, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}
