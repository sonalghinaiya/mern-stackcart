import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, ShoppingBagIcon } from "lucide-react";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

function Cart() {
  const navigate = useNavigate();
  const { cartItem, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-6">
      <div className="flex items-center justify-between mb-6">
        {cartItem.length > 0 && (
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItem.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-28 h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-16 h-16 text-green-800" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => navigate("/products")}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>

            {cartItem.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
