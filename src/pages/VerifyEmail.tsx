import { Link } from 'react-router-dom';

function VerifyEmail() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black text-gray-100">
      <div className="text-center max-w-lg p-8 bg-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-300 mb-6">
          A verification link has been sent to your email address. Please check your inbox (and spam folder) to verify your account before logging in.
        </p>
        
        <p className="text-gray-400 mb-6">
          Once verified, you can log in to your account.
        </p>

        <Link to="/auth/login" className="text-indigo-400 hover:underline text-sm">
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;