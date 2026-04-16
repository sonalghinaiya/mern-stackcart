import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-4 bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition">
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>

            <span className="w-8 text-center font-medium">{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              ₹{subtotal.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-500">
              ₹{item.price.toLocaleString("en-IN")} each
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="self-start p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CartItem;
