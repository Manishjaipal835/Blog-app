import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/LoginSlice";
import axios from "axios";   // 👈 ADD THIS

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
const isAuthenticated = useSelector(
  (state) => state.loginUser?.isAuthenticated
);

  const handleLogout = async () => {   // 👈 make async
    try {
      // ✅ Call backend logout API (clears cookie)
      await axios.post(
        "http://localhost:4000/api/user/logout",
        {},
        { withCredentials: true }
      );

      // ✅ Clear Redux state
      dispatch(logout());

      // ✅ Redirect
      navigate("/login");

    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        <div className="text-2xl font-serif font-bold text-gray-800">
          <Link to="/" className="hover:text-blue-600 transition">
            Daily Blogs
          </Link>
        </div>

        <ul className="flex gap-8 text-gray-700 font-medium items-center">
          <li>
            <Link to="/profile" className="hover:text-blue-600 transition">
              Profile
            </Link>
          </li>

          {isAuthenticated ? (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-600 transition">
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
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
