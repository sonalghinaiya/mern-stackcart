import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/reset-password", {
        password,
      });

      navigate("/login");
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
        <h2 className="font-bold text-2xl mb-4">Reset Password</h2>
        <p className="text-md text-gray-500 mb-5">
          Enter your new password below.
          <br />
          It must be at least 6 characters.
        </p>

        <input
          type="password"
          placeholder="password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white rounded-lg w-full px-2 py-1.5 mt-4"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
