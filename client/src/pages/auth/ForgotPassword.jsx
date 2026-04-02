import React from "react";
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/ui/Input";
import { forgotPasswordSchema } from "../../validators/authValidation";
import Button from "../../components/ui/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse({ email });
    if (!result.success) {
      const error = {};
      result.error.issues.forEach((err) => {
        error[err.path[0]] = err.message;
      });
      setErrors(error);
      return;
    }

    setErrors({});
    if (loading) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });
      toast.success(res.data.message || "OTP sent to your email");
      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Server is taking too long. Try again.");
      } else if (error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Server not reachable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <p className="text-gray-500 text-md -mt-3">
          We’ll send a verification code to your email
        </p>
        <Input
          label="Enter Your Email"
          type="email"
          value={email}
          className="input"
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <Button type="submit" className="w-full" loading={loading}>
          send
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
