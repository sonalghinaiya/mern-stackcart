import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8">StackCart Admin</h2>
      <nav className="space-y-4">
        <NavLink to="/dashboard" className="block hover:text-gray-300">Dashboard</NavLink>
        <NavLink to="/users" className="block hover:text-gray-300">Users</NavLink>
        <NavLink to="/products" className="block hover:text-gray-300">Products</NavLink>
        <NavLink to="/orders" className="block hover:text-gray-300">Orders</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;