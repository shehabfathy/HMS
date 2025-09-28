import { useEffect, useState } from "react"; // 1. Import useCallback
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import CookieService from "../service/Cookies/Cookies";
import { AuthContext } from "./AuthContext";
import type { LoginData } from "../types/types";

interface AuthContextProviderProps {
  children: ReactNode;
}

/** ---------- Provider ---------- */
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const getUser = () => {
    const token = CookieService.get("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<LoginData>(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        toast.error("Session expired. Please log in again.");
        logOut();
      } else {
        setLoginData(decoded);
      }
    } catch (err) {
      const e = err as { message?: string };
      toast.error(e.message || "Invalid token");
      logOut();
    }
  };
  const logOut = () => {
    CookieService.remove("token", { path: "/" });
    setLoginData(null);
    <Navigate to="/login" />;
  };

  useEffect(() => {
    if (CookieService.get("token")) {
      getUser();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, logOut, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}
