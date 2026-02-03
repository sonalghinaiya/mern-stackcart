import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Sign in to your account
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-sm text-right text-blue-600 cursor-pointer hover:underline">
          Forgot your password?
        </p>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>{" "}
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded w-full py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
