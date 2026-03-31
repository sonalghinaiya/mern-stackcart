import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import ProductList from "./pages/products/ProductList";
import ProtectedRoutes from "./components/ProtectedRoutes";
import React from "react";
import Layout from "./Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import ProductDetails from "./pages/products/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
