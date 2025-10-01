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

import Ads_Data from "./pages/Ads/Ads_Data/Ads_Data";
import Rooms_List from "./pages/Rooms/Rooms_List/Rooms_List";
import Rooms_Data from "./pages/Rooms/Rooms_Data/Rooms_Data";
import Facilities_List from "./pages/Facilities/Facilities_List/Facilities_List";
import Facilities_Data from "./pages/Facilities/Facilities_Data/Facilities_Data";
import UsersList from "./pages/Users/UsersList";
import ProtectedRoute from "./shared/ProtectedRoute/ProtectedRoute";
import LandingLayout from "./shared/LandingLayout/LandingLayout";
import LandingPage from "./pages/LandingPage/LandingPage";
import Explore from "./pages/LandingPage/Explore";

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <LandingLayout />,
      errorElement: <NOtFound />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: ROUTES.LANDING_PAGE.slice(1), element: <LandingPage /> },
        { path: ROUTES.EXPLORE.slice(1), element: <Explore /> },
      ],
    },
    {
      element: <AuthLayout />, // This route provides the layout
      errorElement: <NOtFound />,
      // All children are now relative to the root path "/"
      children: [
        { path: ROUTES.LOGIN, element: <Login /> },
        { path: ROUTES.REGISTER, element: <Register /> },
        { path: ROUTES.FORGET_PASSWORD, element: <ForgetPassword /> },
        { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
        { path: ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
      ],
    },
    {
      path: ROUTES.DASHBOARD,
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NOtFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: ROUTES.Users.slice(1), element: <UsersList /> },
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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
