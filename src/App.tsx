import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navigation';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/signup';
import VerifyEmail from './pages/VerifyEmail';
import Policies from './pages/Policies';
import Terms from './pages/Terms';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import SourceConfigPage from './pages/SourceConfigPage';

const App: React.FC = () => {

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Dashboard/>} />
            <Route path="/source-config" element={<SourceConfigPage/>} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;