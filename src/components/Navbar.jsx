import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiGlobe } from "react-icons/fi";

function Navbar({ isAuthenticated, user, setAuth }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Carrier Selection", path: "/carrier-selection" },
    { name: "Shipment Tracking", path: "/shipment-tracking" },
    { name: "Documents", path: "/documents" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Redirect to Sign In page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Boundless Connect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks
              .filter((link) => isAuthenticated || link.name === "Home") // Show Home for non-authenticated users
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    isActive(link.path)
                      ? "text-blue-300 border-b-2 border-blue-300"
                      : "hover:text-blue-300"
                  } px-3 py-2 text-sm font-medium transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
            {!isAuthenticated ? (
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm font-medium">
                  <FiUser className="mr-1 text-blue-300" />
                  {user?.name.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-sm font-medium hover:text-blue-300"
                >
                  <FiLogOut className="mr-1" />
                  Logout
                </button>
                <button className="flex items-center hover:text-blue-300">
                  <FiGlobe className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-300 focus:outline-none"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950">
          <div className="px-4 py-3 space-y-2">
            {navLinks
              .filter((link) => isAuthenticated || link.name === "Home") // Show Home for non-authenticated users
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-600 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            {!isAuthenticated ? (
              <Link
                to="/auth"
                className="block px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
