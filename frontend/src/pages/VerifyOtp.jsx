import React from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold">Verify</h2>
        <p className="text-sm text-gray-500 mb-4">
          Please check your email for a six-digit security code and enter it
          below
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
        <button
          type="submit"
          className="bg-gray-900 text-white rounded w-full px-2 py-1.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
