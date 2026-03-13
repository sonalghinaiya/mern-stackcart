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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-6xl mx-auto py-3 px-6 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group"
        >
          <img src="/logo.svg" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-lg text-gray-900 group-hover:text-gray-700">
            Stack<span className="text-gray-500">Cart</span>
          </span>
        </button>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <button
            onClick={() => navigate("/products")}
            className="hover:text-gray-900"
          >
            Products
          </button>
        </div>
        <div className="flex gap-5 items-center relative">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
          <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />
          <CircleUserRound className="w-5 h-5 text-gray-700 cursor-pointer" onClick={toggleMenu} />
          {menuVisible && (
            <div className="absolute top-10 right-0 bg-white shadow rounded w-44">
              {token ? (
                <>
                  <div
                    onClick={() => navigate("/products")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    All Products
                  </div>
                  <div
                    onClick={() => navigate("/cart")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Cart
                  </div>
                  <div
                    onClick={logout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => navigate("/products")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    All Products
                  </div>
                  <div
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Login
                  </div>
                  <div
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Register
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, User, LogOut, Package, ChevronDown } from "lucide-react";

// // StackCart SVG Logo
// function StackCartLogo({ size = 32 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//       {/* Stack layers */}
//       <rect x="6" y="6" width="22" height="5" rx="2" fill="#111827" />
//       <rect x="9" y="13" width="22" height="5" rx="2" fill="#374151" />
//       <rect x="12" y="20" width="22" height="5" rx="2" fill="#6B7280" />
//       {/* Cart wheels */}
//       <circle cx="16" cy="33" r="3" fill="#111827" />
//       <circle cx="28" cy="33" r="3" fill="#111827" />
//       {/* Cart handle */}
//       <path d="M4 4 L8 4 L12 20" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   );
// }

// function Header() {
//   const navigate = useNavigate();
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [scrolled, setScrolled] = useState(false);
//   const menuRef = useRef(null);
//   const searchRef = useRef(null);

//   // Read from localStorage (since that's where Login.jsx stores it)
//   const token = localStorage.getItem("token");
//   const user = (() => {
//     try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
//   })();
//   const firstLetter = user?.firstName?.[0]?.toUpperCase() || "U";

//   // Shadow on scroll
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 8);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Close menu/search on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuVisible(false);
//       if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const logout = () => {
//     localStorage.clear();
//     setMenuVisible(false);
//     navigate("/login");
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
//         scrolled ? "shadow-md" : "border-b border-gray-100"
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

//         {/* Logo + Brand */}
//         <button
//           onClick={() => navigate("/")}
//           className="flex items-center gap-2.5 shrink-0 group"
//         >
//           <StackCartLogo size={34} />
//           <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-gray-700 transition-colors">
//             Stack<span className="text-gray-500">Cart</span>
//           </span>
//         </button>

//         {/* Nav links — desktop */}
//         <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
//           <button onClick={() => navigate("/products")} className="hover:text-gray-900 transition-colors">
//             Products
//           </button>
//         </div>

//         {/* Right icons */}
//         <div className="flex items-center gap-1.5 sm:gap-2">

//           {/* Search */}
//           <div ref={searchRef} className="relative">
//             {searchOpen ? (
//               <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 bg-gray-50 shadow-sm">
//                 <Search className="w-4 h-4 text-gray-400 shrink-0" />
//                 <input
//                   autoFocus
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="bg-transparent text-sm outline-none w-40 text-gray-700 placeholder:text-gray-400"
//                   onKeyDown={(e) => {
//                     if (e.key === "Escape") setSearchOpen(false);
//                     if (e.key === "Enter") {
//                       navigate(`/products?q=${searchQuery}`);
//                       setSearchOpen(false);
//                     }
//                   }}
//                 />
//               </div>
//             ) : (
//               <button
//                 onClick={() => setSearchOpen(true)}
//                 className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
//                 aria-label="Search"
//               >
//                 <Search className="w-5 h-5 text-gray-600" />
//               </button>
//             )}
//           </div>

//           {/* Cart */}
//           <button
//             onClick={() => navigate("/cart")}
//             className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative"
//             aria-label="Cart"
//           >
//             <ShoppingCart className="w-5 h-5 text-gray-600" />
//             {/* Uncomment and pass cartCount as prop when ready: */}
//             {/* {cartCount > 0 && (
//               <span className="absolute top-1 right-1 w-4 h-4 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )} */}
//           </button>

//           {/* Profile dropdown */}
//           <div ref={menuRef} className="relative">
//             <button
//               onClick={() => setMenuVisible(!menuVisible)}
//               className="flex items-center gap-1.5 ml-1 pl-2 pr-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
//               aria-label="Profile menu"
//             >
//               {token && user ? (
//                 <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
//                   {firstLetter}
//                 </div>
//               ) : (
//                 <User className="w-5 h-5 text-gray-600" />
//               )}
//               <ChevronDown
//                 className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${menuVisible ? "rotate-180" : ""}`}
//               />
//             </button>

//             {menuVisible && (
//               <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-fade-in">
//                 {token ? (
//                   <>
//                     {user && (
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <p className="text-sm font-semibold text-gray-800 truncate">
//                           {user.firstName} {user.lastName}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {user.email}</p>
//                       </div>
//                     )}
//                     <button
//                       onClick={() => { navigate("/products"); setMenuVisible(false); }}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       <Package className="w-4 h-4 text-gray-400" />
//                       All Products
//                     </button>
//                     <button
//                       onClick={() => { navigate("/profile"); setMenuVisible(false); }}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       <User className="w-4 h-4 text-gray-400" />
//                       My Profile
//                     </button>
//                     <div className="border-t border-gray-100">
//                       <button
//                         onClick={logout}
//                         className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                       >
//                         <LogOut className="w-4 h-4" />
//                         Logout
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => { navigate("/products"); setMenuVisible(false); }}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       <Package className="w-4 h-4 text-gray-400" />
//                       All Products
//                     </button>
//                     <button
//                       onClick={() => { navigate("/login"); setMenuVisible(false); }}
//                       className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       <User className="w-4 h-4 text-gray-400" />
//                       Login
//                     </button>
//                     <button
//                       onClick={() => { navigate("/register"); setMenuVisible(false); }}
//                       className="w-full px-4 py-2.5 text-sm text-left"
//                     >
//                       <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
//                         Sign Up
//                       </span>
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* CSS for fade-in */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-6px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in { animation: fadeIn 0.15s ease-out; }
//       `}</style>
//     </nav>
//   );
// }

// export default Header;
