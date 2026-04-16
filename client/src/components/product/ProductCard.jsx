import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cartItem, addToCart } = useCart();

  const isInCart = cartItem.some((item) => item._id === product?._id);

  const handleNavigate = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const rating = product.rating || 0;

  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-md z-10">
            Best Seller
          </span>
        )}

        <img
          src={product.image || "/placeholder.png"}
          onError={(e) => (e.target.src = "/placeholder.png")}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end justify-end p-3 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
            className="bg-white p-2 rounded-full shadow hover:scale-110 transition"
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2 mb-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              fill={rating >= star ? "currentColor" : "none"}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ₹{(product.price + 500).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1 px-3 text-white py-1.5 rounded-lg text-sm transition ${
              !product.inStock
                ? "bg-gray-400 cursor-not-allowed"
                : isInCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {!product.inStock
              ? "Out"
              : isInCart
                ? "Remove"
                : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
