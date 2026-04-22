import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ onClose }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!text.trim()) return;
    navigate(`/products?search=${text}`);
    onClose();
  };

  return (
    <input
      autoFocus
      type="text"
      placeholder="Search products..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="w-64 md:w-80 px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
    />
  );
}

export default SearchBar;