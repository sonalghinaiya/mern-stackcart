import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Search, ShoppingCart } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const token = localStorage.getItem("token");
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-xl text-gray-900 group-hover:text-gray-700">
            Stack<span className="text-gray-500">Cart</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button onClick={() => navigate("/")} className="hover:text-gray-900">
            Home
          </button>
          <button
            onClick={() => navigate("/products")}
            className="hover:text-gray-900"
          >
            Products
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="hover:text-gray-900"
          >
            Cart
          </button>
        </div>
        <div className="flex items-center gap-1 relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <Search className="w-5.5 h-5.5 text-gray-600" />
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ShoppingCart className="w-5.5 h-5.5 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={toggleMenu}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <CircleUserRound className="w-5.5 h-5.5 text-gray-600" />
            </button>

            {menuVisible && (
              <div className="absolute top-11 right-0 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                {token ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/products");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => {
                        navigate("/");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cart
                    </button>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/products");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
