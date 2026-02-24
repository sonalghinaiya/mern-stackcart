import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import React from "react";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";

function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
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
