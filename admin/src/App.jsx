import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Products from "./pages/product/Product";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route
        path="/"
        element={
          !token ? (
            <Navigate to="/auth/login" />
          ) : user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      <Route
        path="/auth/login"
        element={
          token && user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Login />
          )
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
