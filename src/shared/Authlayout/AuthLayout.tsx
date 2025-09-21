import { Outlet, useLocation } from "react-router-dom";
import ResetImage from "../../assets/Reset.png";
import ForgetImage from "../../assets/Forget.png";

export const AuthLayout = () => {
  const pageData: Record<
    string,
    { src: string; title: string; subtitle: string }
  > = {
    "/forget-password": {
      src: ForgetImage,
      title: "Welcome Back",
      subtitle: "Sign in to access your account.",
    },
    "/reset-password": {
      src: ResetImage,
      title: "Reset Password",
      subtitle: "Homes as unique as you.",
    },
  };

  const location = useLocation();
  const currentData =
    pageData[location.pathname] || pageData["/forget-password"];

  return (
    <div className="flex w-screen h-screen overflow-hidden p-4 bg-gray-50">
      {/* Left Side - Renders the child route component */}
      <div className="w-full lg:w-1/2 p-8 overflow-y-auto bg-white rounded-lg shadow">
        <Outlet />
      </div>

      {/* Right Side - Dynamic Image */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center">
        <img
          src={currentData.src}
          alt={currentData.title}
          className="object-cover w-full h-full rounded-lg shadow"
        />
      </div>
    </div>
  );
};
