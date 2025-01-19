import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { signUp } = useUserAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, displayName);
      navigate('/verify-email');
      window.location.reload();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please log in or reset your password.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen overflow-hidden bg-gradient-to-r from-gray-900 to-black">
        <div className="flex items-center justify-center h-full relative">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md relative"
          >
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

            <h3 className="text-4xl font-bold text-gray-100 text-center mb-6">Create an Account</h3>
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
              <div className="space-y-2 relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 tracking-wide">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full text-base px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900 text-gray-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825c-.982.51-2.048.82-3.125.825-4.185-.025-8.41-2.917-10.68-7.65C3.465 6.11 7.68 3.225 11.875 3.2c1.078.004 2.144.317 3.128.825M19 4l-3.5 3.5M9.5 10.5L6 14m0-8l3.5 3.5m9 9L19 20M9.5 10.5l3.5-3.5m0 0L19 4m-9.5 6.5L6 14"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12A3 3 0 1112 9a3 3 0 013 3zm0 0a6 6 0 11-12 0c0-3 3-6 6-6s6 3 6 6z"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </div>

              {/* Display Name Field */}
              <div className="space-y-2">
                <label htmlFor="displayName" className="text-sm font-medium text-gray-300 tracking-wide">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  className="w-full text-base px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-900 text-gray-200"
                  placeholder="Your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              {/* Error Message */}
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition duration-300 ease-in-out"
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 018.66 5" />
                    </svg>
                  ) : (
                    'Sign up'
                  )}
                </button>
              </div>

              {/* Terms and Policy Links */}
              <p className="mt-4 text-xs text-center text-gray-400">
                By signing up, you agree to our{' '}
                <Link to="/terms" className="text-indigo-400 hover:underline">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link to="/policies" className="text-indigo-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Login Link */}
              <p className="mt-4 text-sm text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-indigo-400 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;