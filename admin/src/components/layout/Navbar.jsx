import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">Admin Panel</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.firstName}
        </span>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="text-red-500 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
