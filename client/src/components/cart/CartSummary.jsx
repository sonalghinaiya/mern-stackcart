import React from "react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();

  const shipping = subtotal > 500 ? 0 : 50;

  const tax = Math.round(subtotal * 0.18);

  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Items </span>
          <span className="font-medium">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `₹${shipping}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (GST 18%)</span>
          <span className="font-medium">₹{tax.toLocaleString("en-IN")}</span>
        </div>

        {subtotal < 500 && subtotal > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
            Add ₹{(500 - subtotal).toLocaleString("en-IN")} more for FREE
            shipping!
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold text-indigo-600">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      <button
      onClick={() => navigate("/checkout")}
        className={`w-full py-3 rounded-lg font-semibold transition
       disabled={totalItems === 0}
         ${
           totalItems === 0
             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
             : "bg-indigo-600 text-white hover:bg-indigo-700"
         }
      `}
      >
        Proceed to Checkout
      </button>

      <div className="mt-4 text-center flex items-center justify-center">
        <button
          onClick={() => navigate("/products")}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center justify-center gap-1 mb-2"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
