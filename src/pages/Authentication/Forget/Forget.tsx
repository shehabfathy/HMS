import { Link } from "react-router-dom";

// ForgetPassword Component
const ForgetPassword = () => {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-900">Staycation.</h1>
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
        <p className="text-gray-500 mt-2">
          Enter your email address below, and we’ll send you a reset link.
        </p>
        <p className="text-gray-500">
          Remembered it?{" "}
          <Link to="/login" className="text-red-500 font-semibold">
            Login here!
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Reset Link
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
