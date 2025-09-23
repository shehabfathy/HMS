import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Authentication/Register/Register";
import { Toaster } from "react-hot-toast";
import { ROUTES } from "./service/Endpoint/Endpoint";
import AuthLayout from "./shared/Authlayout/AuthLayout";
import NOtFound from "./shared/NotFound/NOtFound";
import Login from "./pages/Authentication/Login/Login";
import ForgetPassword from "./pages/Authentication/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/Authentication/ResetPassword/ResetPassword";
import ChangePassword from "./pages/Authentication/ChangePassword/ChangePassword";
import Dashboard from "./pages/DahBoard/Dashboard";
import MasterLayout from "./shared/MasterLayout/MasterLayout";
import Booking from "./pages/Booking/Booking";
import Ads_List from "./pages/Ads/Ads_List/Ads_List";
import Users from "./pages/Users/Users";
import Ads_Data from "./pages/Ads/Ads_Data/Ads_Data";
import Rooms_List from "./pages/Rooms/Rooms_List/Rooms_List";
import Rooms_Data from "./pages/Rooms/Rooms_Data/Rooms_Data";
import Facilities_List from "./pages/Facilities/Facilities_List/Facilities_List";
import Facilities_Data from "./pages/Facilities/Facilities_Data/Facilities_Data";

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <AuthLayout />,
      errorElement: <NOtFound />,
      children: [
        { index: true, element: <Login /> },
        { path: ROUTES.LOGIN.slice(1), element: <Login /> },
        { path: ROUTES.REGISTER.slice(1), element: <Register /> },
        { path: ROUTES.FORGET_PASSWORD.slice(1), element: <ForgetPassword /> },
        { path: ROUTES.RESET_PASSWORD.slice(1), element: <ResetPassword /> },
        // { path: ROUTES.VERIFY_ACCOUNT.slice(1), element: <VerifyAcc /> },
        { path: ROUTES.CHANGE_PASSWORD.slice(1), element: <ChangePassword /> },
      ],
    },
    {
      path: ROUTES.DASHBOARD,
      element: <MasterLayout />,
      errorElement: <NOtFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: ROUTES.Users.slice(1), element: <Users /> },
        { path: ROUTES.Ads_List.slice(1), element: <Ads_List /> },
        { path: ROUTES.Ads_Data.slice(1), element: <Ads_Data /> },
        { path: ROUTES.Rooms_List.slice(1), element: <Rooms_List /> },
        { path: ROUTES.Rooms_Data.slice(1), element: <Rooms_Data /> },
        { path: ROUTES.Facilities_List.slice(1), element: <Facilities_List /> },
        { path: ROUTES.Facilities_Data.slice(1), element: <Facilities_Data /> },
        { path: ROUTES.Booking.slice(1), element: <Booking /> },
        // { path: ROUTES.PROFILE.slice(1), element: <UserProfile /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
