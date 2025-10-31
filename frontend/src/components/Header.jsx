import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); // { email, role }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Extract email & role safely
  const userEmail = user?.email || "User";
  const userRole = user?.role || "USER";

  return (
    <header className="w-full bg-black/30 backdrop-blur-md shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/home" className="text-white flex font-bold text-xl">
          <img
            src="react.svg"
            alt="JobHunter Logo"
            className="w-8 h-8 object-contain"
          />
          JobHunter
        </Link>

        {/* Right Menu */}
        {!token ? (
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-purple-400 transition">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-purple-400 transition">
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-white font-medium hover:text-purple-400 transition"
            >
              {userEmail.split("@")[0]}{" "}
              <span className="text-sm text-purple-400">({userRole})</span>
              <span className="text-white">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
                {userRole === "COMPANY" ? (
                  <Link
                    to="/company/dashboard"
                    className="block px-4 py-2 text-white hover:bg-purple-600 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Company Dashboard
                  </Link>
                ) : (<>
                  <Link
                     to="/applied-jobs"
                    className="block px-4 py-2 text-white hover:bg-purple-600 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Jobs
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-white hover:bg-purple-600 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    All Jobs
                  </Link>
                  <Link
                  to="/profile"
                  className="block px-4 py-2 text-white hover:bg-purple-600 transition"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                  </>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
