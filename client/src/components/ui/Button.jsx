import React from "react";

function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      } ${className}`}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;

