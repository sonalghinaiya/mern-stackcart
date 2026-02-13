import React from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useEffect } from "react";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      navigate("/forgot-password");
    }
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp,
      });
      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);

    try {
      await api.post("/auth/resend-otp", { email });
      setTimer(60);
    } catch (error) {
      console.log(error);
    } finally {
      setResending(false);
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
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "45px",
            height: "50px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "18px",
          }}
          containerStyle={{ justifyContent: "space-between" }}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white rounded w-full px-2 py-1.5"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-4 text-sm">
          {timer > 0 ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resending}
              className="text-gray-900 hover:underline"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default VerifyOtp;
