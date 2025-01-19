import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, BarChart2, LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useUserAuth } from "../context/UserAuthContext";

export const Navbar: React.FC = () => {
  const { user, logOut } = useUserAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      setShowLogoutModal(false);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center space-x-6">
            <button onClick={toggleMenu} className="md:hidden text-white hover:text-gray-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-semibold tracking-wide">LEMA</h1>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <LayoutDashboard size={18} />
                <span className="ml-2">Dashboard</span>
              </NavLink>
              <NavLink
                to="/source-config"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <ListTodo size={18} />
                <span className="ml-2">Sources</span>
              </NavLink>
              <NavLink
                to="/stats"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <BarChart2 size={18} />
                <span className="ml-2">Stats</span>
              </NavLink>
            </div>
          </div>

          {/* Right Section: Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center space-x-1 text-red-400 hover:text-red-500"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <NavLink
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 rounded-md shadow-sm"
                >
                  Signup
                </NavLink>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col justify-center items-center">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
            <X className="h-8 w-8" />
          </button>
          <NavLink
            to="/"
            onClick={toggleMenu}
            className="text-lg font-medium mb-4 hover:text-gray-300"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/source-config"
            onClick={toggleMenu}
            className="text-lg font-medium mb-4 hover:text-gray-300"
          >
            Sources
          </NavLink>
          <NavLink
            to="/stats"
            onClick={toggleMenu}
            className="text-lg font-medium mb-4 hover:text-gray-300"
          >
            Stats
          </NavLink>
          {!user && (
            <>
              <NavLink
                to="/auth/login"
                onClick={toggleMenu}
                className="text-lg font-medium mb-4 text-blue-400 hover:text-blue-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/signup"
                onClick={toggleMenu}
                className="text-lg font-medium text-green-400 hover:text-green-300"
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-medium text-white mb-4">Confirm Logout</h2>
            <p className="text-sm text-gray-400 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-600 text-gray-200 hover:bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};