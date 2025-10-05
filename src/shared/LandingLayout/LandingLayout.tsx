import { Outlet } from "react-router-dom";
import Header from "../../pages/LandingPage/Header";
import Footer from "../Footer/Footer";
export default function LandingLayout() {
  return (
    <>
      <Header isLoggedIn={false} onLogout={() => {}} />
      <Outlet />
      <Footer />
    </>
  );
}
