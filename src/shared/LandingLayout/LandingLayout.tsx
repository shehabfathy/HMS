import { Outlet } from "react-router-dom";
import Header from "../../pages/LandingPage/Header";

export default function LandingLayout() {
  return (
    <>
      <Header isLoggedIn={false} onLogout={() => {}} />
      <Outlet />
    </>
  );
}
