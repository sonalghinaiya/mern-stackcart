import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route
        path="/"
        element={
          token && user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
      <Route path="/auth/login" element={<Login />} />
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
        <Route path="products" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
