import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      key={product._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden group">
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-md z-10">
            Best Seller
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end justify-end p-3 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product._id}`);
            }}
            className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:scale-110 transition"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-md line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center gap-1 text-yellow-400 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              fill={product.rating >= star ? "currentColor" : "none"}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm transition">
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
