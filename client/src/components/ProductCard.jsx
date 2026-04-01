import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      key={product._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative p-4">
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs px-2 py-1 rounded-lg">
            Best Seller
          </span>
        )}

        <img
          onClick={() => navigate(`/products/${product._id}`)}
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-contain cursor-pointer"
        />
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
