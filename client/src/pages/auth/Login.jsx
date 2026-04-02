import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useGoogleAuth } from "../../utils/googleAuth";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { loginSchema } from "../../validators/authValidation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
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
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.data, res.data.token);
      toast.success(res.data.message || "Login Successful");

      navigate("/");
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
    <div className="flex items-center justify-center bg-gray-100 min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-full max-w-sm"
      >
        <h2 className="font-bold text-center text-2xl">Welcome back</h2>
        <p className="text-md text-gray-500 text-center mb-5">
          Login to your StackCart account
        </p>
        <div>
          <Input
            label="Email"
            type="email"
            value={email}
            className="input"
            error={errors.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
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
        </div>
        <p className="text-sm text-right mb-4 text-gray-800 cursor-pointer hover:underline">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
        <Button type="submit" className="w-full" loading={loading}>
          Login
        </Button>
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
          onClick={() => googleLogin()}
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
