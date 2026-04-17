import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCartItem(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    const exists = cartItem.find((item) => item._id === product._id);

    if (exists) {
      setCartItem((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCartItem([]);
  };

  const getTotalItems = () => {
    return cartItem.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const removeFromCart = (id) => {
    setCartItem(cartItem.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setCartItem(
      cartItem.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
