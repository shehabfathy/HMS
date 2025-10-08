import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import CookieService from "../../service/Cookies/Cookies";
import Header from "../../pages/LandingPage/Header";
import Footer from "../Footer/Footer";

// --- Main Layout Component ---

export default function LandingLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // useEffect runs once when the layout mounts to check the login status.
  useEffect(() => {
    const token = CookieService.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // This function will be passed to the Header to handle the logout process.
  const handleLogout = () => {
    CookieService.remove("token"); // Clear the token cookie
    setIsLoggedIn(false); // Update the state
    toast.success("You have been logged out successfully.");
    navigate("/"); // Redirect to the landing page
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* The Header now receives the actual login state and logout handler */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Outlet />
      <Footer />
    </Box>
  );
}
