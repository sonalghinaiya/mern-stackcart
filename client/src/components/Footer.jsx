import React from "react";
import {
  Zap,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
// import { createPageUrl } from "@/utils";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
                {/* <img
                  src="/logo.svg"
                  alt=""
                  className="w-4 h-4 text-white fill-white"
                /> */}
              </div>
              <span className="text-xl font-bold text-white">
                Stack<span className="text-indigo-400">Cart</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Your one-stop shop for quality products at unbeatable prices. Shop
              smart, live well.
            </p>
            <div className="flex gap-3">
              {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {["All Products", "New Arrivals", "Best Sellers", "Sale", "Collections"].map((l) => (
                 <li key={l}><a className="hover:text-indigo-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Help</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "FAQ",
                "Shipping Policy",
                "Returns & Exchanges",
                "Track Order",
                "Contact Us",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />{" "}
                support@stackcart.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" /> +1 (555) 000-0000
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 mt-0.5" /> 123
                Commerce St,
                <br />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 StackCart. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:text-indigo-400 transition-colors"
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
