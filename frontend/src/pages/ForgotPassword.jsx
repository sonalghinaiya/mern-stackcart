import React from "react";
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });
      navigate("/verify-otp");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <label htmlFor="email" className="text-sm font-semibold">
          Enter Your Email
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white rounded w-full font-semibold px-2 py-1.5 mt-4"
        >
          send
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
