import React, { useState, FormEvent, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <div className="overflow-hidden h-screen bg-gradient-to-r from-gray-900 to-black">
        <div className="flex items-center justify-center h-full relative">
          <form
            className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md relative"
            onSubmit={handleSubmit}
          >
            {/* Close Button */}
            <Link to="/" className="absolute top-4 right-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-500 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </Link>

            <h3 className="text-4xl font-bold text-gray-100 text-center mb-6">Welcome Back</h3>
            <div className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 tracking-wide">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full text-base px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900 text-gray-200"
                  placeholder="mail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 tracking-wide"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full text-base px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900 text-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-center text-sm min-h-[30px]">
                  <p>{error}</p>
                </div>
              )}

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition duration-300 ease-in-out"
                >
                  Sign in
                </button>

                {/* Forgot Password Link */}
                <p className="mt-2 text-sm text-center text-gray-400">
                  Forgot your password?{" "}
                  <Link to="/auth/reset-password" className="text-indigo-400 hover:underline">
                    Reset Password
                  </Link>
                </p>

                {/* OR Divider */}
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-600"></div>
                  <span className="flex-shrink mx-4 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-600"></div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition duration-300 ease-in-out"
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google logo"
                    className="w-5 h-5 mr-3"
                  />
                  Sign in with Google
                </button>

                {/* Signup Link */}
                <p className="mt-4 text-sm text-center text-gray-400">
                  New here?{" "}
                  <Link to="/auth/signup" className="text-indigo-400 hover:underline">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;