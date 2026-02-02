import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="flex justify-around m-5 p-6">
      <Link to="/products">Products</Link>
      <Link to="/products/add">Add Product</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
