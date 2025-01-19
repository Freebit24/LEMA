import React, { useState, FormEvent } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { resetPassword } = useUserAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage("Check your email for further instructions.");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">Reset Password</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 tracking-wide">Email</label>
            <input
              type="email"
              required
              className="w-full text-base px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900 text-gray-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition duration-300 ease-in-out"
          >
            Send Reset Link
          </button>
          <p className="mt-4 text-sm text-center text-gray-400">
            Remember your password?{" "}
            <Link to="/auth/login" className="text-indigo-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;