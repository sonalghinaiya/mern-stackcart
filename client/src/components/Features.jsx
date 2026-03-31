import {
  CornerUpLeft,
  Headset,
  RotateCcw,
  Shield,
  Truck,
  Undo,
} from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Truck className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold">Free Shipping</h3>
          <p className="text-sm text-gray-500">On orders above ₹500</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold">Secure Payment</h3>
          <p className="text-sm text-gray-500">100% safe transactions</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <RotateCcw className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold">Easy Returns</h3>
          <p className="text-sm text-gray-500">7 day return policy</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Headset className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <p className="text-sm text-gray-500">24/7 customer help</p>
        </div>
      </div>
    </section>
  );
}
