import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { BsFillCartFill } from "react-icons/bs";
import { PiUserCircleFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import Dialog from "../ui/Dialog";
import { useCart } from "../../context/CartContext";
import SearchBar from "../ui/SearchBar";

function Header() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogut = () => {
    logout();
    setOpenLogout(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xs">
      <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          <img src="/logo.svg" alt="logo" className="w-9 h-9" />
          <span className="font-bold text-2xl text-gray-900 group-hover:text-gray-700">
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
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <IoSearch className="w-5.5 h-5.5 text-gray-700" />
          </button>
          {showSearch && (
            <div className="flex items-center ml-2 transition-all">
              <SearchBar onClose={() => setShowSearch(false)} />
            </div>
          )}
          <button
            onClick={() => navigate("/cart")}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 relative"
          >
            <BsFillCartFill className="w-5.5 h-5.5 text-gray-700" />
            <span className="absolute text-sm text-white bg-rose-500 rounded-full px-1 left-4 -top-1">
              {getTotalItems()}
            </span>
          </button>

          <div className="relative">
            <button
              onClick={toggleMenu}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <PiUserCircleFill className="w-7 h-7 text-gray-700" />
            </button>

            {menuVisible && (
              <div className="absolute top-11 right-0 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 font-semibold py-2.5 text-sm text-gray-700 hover:bg-gray-50 p-2 border-b border-gray-100"
                    >
                      {user?.firstName} {user?.lastName}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => {
                        navigate("/cart");
                        setMenuVisible(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Cart
                    </button>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => {
                          setOpenLogout(true);
                          setMenuVisible(false);
                        }}
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
      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={handleLogut}
        title="Logout?"
        message="Are you sure you want to log out?"
        confirmText=" Yes, Logout"
      />
    </nav>
  );
}
export default Header;
