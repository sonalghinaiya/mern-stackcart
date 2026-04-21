import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App.jsx";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                fontSize: "14px",
                fontWeight: "500",
              },
              success: {
                style: {
                  background: "#ecfdf5",
                  color: "#065f46",
                  border: "1px solid #ecfdf6",
                },
              },
              error: {
                style: {
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1px solid #fef2f7",
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
