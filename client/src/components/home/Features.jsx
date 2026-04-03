import { Headset, RotateCcw, Shield, Truck } from "lucide-react";
import React from "react";

const features = [
  {
    icon: <Truck className="w-5 h-5 text-indigo-600" />,
    title: "Free Shipping",
    desc: "On orders above ₹500",
  },
  {
    icon: <Shield className="w-5 h-5 text-indigo-600" />,
    title: "Secure Payment",
    desc: "100% safe transactions",
  },
  {
    icon: <RotateCcw className="w-5 h-5 text-indigo-600" />,
    title: "Easy Returns",
    desc: "7 day return policy",
  },
  {
    icon: <Headset className="w-5 h-5 text-indigo-600" />,
    title: "Support",
    desc: "24/7 customer help",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
