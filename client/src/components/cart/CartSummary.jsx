import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCart();

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

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Secure Checkout
        </p>
      </div>
    </div>
  );
}

export default CartSummary;
