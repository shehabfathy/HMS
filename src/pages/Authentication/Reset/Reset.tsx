import { useState } from "react";
import { Link } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

// 2. ResetPassword Component (The form)
const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900">Staycation.</h1>
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-gray-500 mt-2">
          Enter your new password details below.
        </p>
        <p className="text-gray-500">
          Remembered it?{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            Login here!
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6">
        {/* OTP Input, etc. */}
        <div>
          <label htmlFor="otp" className="text-sm font-medium text-gray-700">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please type here"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please type here"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative mt-1">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please type here"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
