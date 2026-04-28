import React from "react";

function Button({
  children,
  onClick,
  type = "button",
  loading = false,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`px-4 py-2 rounded-lg text-white transition flex items-center justify-center gap-2 ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      } ${className}`}
    >
      {loading ?   (
        <>
          <span
            className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
          />
          Please wait...
        </>
      ) : children}
    </button>
  );
}

export default Button;