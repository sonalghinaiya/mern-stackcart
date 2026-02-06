import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductList from "./pages/ProductList";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Navbar from "./components/Navbar";
import React from "react";
import AddEditProduct from "./pages/AddEditProduct";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoutes>
              <ProductList />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products/add"
          element={
            <ProtectedRoutes>
              <AddEditProduct />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoutes>
              <AddEditProduct />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
