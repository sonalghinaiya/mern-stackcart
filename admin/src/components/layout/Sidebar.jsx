import { NavLink } from "react-router-dom";
import React from "react";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">StackCart</h1>

      <nav className="space-y-4 text-sm">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Products
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
