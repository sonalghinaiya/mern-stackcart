import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="bg-gray-800 text-white flex justify-between py-3 px-6">
      <h1 className="font-bold text-lg">My App</h1>
      <div className="flex items-center gap-8">
        {token ? (
          <>
            <Link to="/products" className="hover:text-gray-300">
              Products
            </Link>
            <Link to="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
