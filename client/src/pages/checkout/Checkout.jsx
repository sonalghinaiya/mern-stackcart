import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Checkout() {
  const { cartItem, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setTimeout(() => {
      clearCart();
      navigate("/order-success");
    }, 1000);
  };

  const total = getTotalPrice();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
