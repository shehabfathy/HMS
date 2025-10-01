import { Outlet } from "react-router-dom";
import Header from "../../pages/LandingPage/Header";
import { Container } from "@mui/material";

export default function LandingLayout() {
  return (
    <>
      <Container>
        <Header isLoggedIn={false} onLogout={() => {}} />
        <Outlet />
      </Container>
    </>
  );
}
