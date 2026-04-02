import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../../validators/authValidation";
import Input from "../../components/ui/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from "../../components/ui/Button";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = resetPasswordSchema.safeParse({ password });
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
      const res = await api.post("/auth/reset-password", {
        email,
        password,
      });
      toast.success(
        res.data.message || "Password reset successfully. Please login",
      );
      navigate("/login");
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
        className="bg-white p-8 rounded-2xl shadow w-full max-w-sm"
      >
        <h2 className="font-bold text-2xl mb-4">Reset Password</h2>
        <p className="text-md text-gray-500 mb-5">
          Enter your new password below.
          <br />
          It must be at least 6 characters.
        </p>

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          className="input"
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
            </span>
          }
        />
        <Button type="submit" className="w-full mt-3" loading={loading}>
          Change Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
