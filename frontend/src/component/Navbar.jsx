import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <div className="text-2xl font-serif font-bold text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition">
            Daily Blogs
          </Link>
        </div>

        {/* Menu */}
        <ul className="flex gap-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/profile"
              className="hover:text-blue-600 transition"
            >
              Profile
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-blue-600 transition"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/reg"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
