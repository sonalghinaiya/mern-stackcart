import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element="" />
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
              <Product />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/products/add"
          element={
            <ProtectedRoutes>
              <AddProduct />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
