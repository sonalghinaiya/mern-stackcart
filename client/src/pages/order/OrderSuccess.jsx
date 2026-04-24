import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import confetti from "canvas-confetti";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderNumber = location.state?.orderNumber || "N/A";
  const total = location.state?.total || 0;

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 pt-16 py-2">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-left">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="text-md font-bold text-gray-900">{orderNumber}</p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-lg font-bold text-indigo-600">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-2 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              <Package className="w-5 h-5" />
              View Orders
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Need help?{" "}
            <a href="#" className="text-indigo-600 hover:underline font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
