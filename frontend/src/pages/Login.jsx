import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FcGoogle } from "react-icons/fc";

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
        className="bg-white p-8 rounded-2xl shadow w-full max-w-sm"
      >
        <h2 className="font-bold text-center text-2xl">Welcome back</h2>
        <p className="text-md text-gray-500 text-center mb-5">
          Login to your StackCart account
        </p>
        <label htmlFor="email" className="text-sm font-semibold">
          Email
        </label>
        <input
          type="email"
          placeholder="sg@gmail.com"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <input
          type="password"
          placeholder="password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-sm text-right mb-4 text-gray-800 cursor-pointer hover:underline">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
        <button
          type="submit"
          className="bg-gray-900 text-white rounded-lg w-full px-2 py-1.5"
        >
          Login
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative text-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-gray-800 hover:underline">
            Sign Up
          </Link>{" "}
        </p>
      </form>
    </div>
  );
}

export default Login;
