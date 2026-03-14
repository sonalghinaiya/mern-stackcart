import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-20">
      <div className="border-t border-gray-800 mx-auto max-w-6xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} StackCart. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-indigo-400 transition-colors">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
