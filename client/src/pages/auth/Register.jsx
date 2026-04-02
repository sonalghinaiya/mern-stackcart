import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FcGoogle } from "react-icons/fc";
import { FiUpload } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useGoogleAuth } from "../../utils/googleAuth";
import toast from "react-hot-toast";
import { registerSchema } from "../../validators/authValidation";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const googleLogin = useGoogleAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      gender: formData.get("gender"),
      jobTitle: formData.get("jobTitle"),
      profileImage: formData.get("profileImage"),
    };

    const result = registerSchema.safeParse(data);
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
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message || "Register Successful");
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
    <div className="flex items-center justify-center bg-gray-100 min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Create account</h2>
        <p className="text-gray-500 text-md text-center mb-4">
          Signup to your StackCart
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Input
            className="input"
            name="firstName"
            placeholder="First name"
            error={errors.firstName}
            required
          />
          <Input
            className="input"
            name="lastName"
            placeholder="Last name"
            error={errors.lastName}
          />
        </div>

        <Input
          name="email"
          type="email"
          className="input"
          error={errors.email}
          placeholder="Email"
          required
        />

        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="input"
          name="password"
          error={errors.password}
          required
          rightIcon={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOff size={16} /> : <IoEye size={16} />}
            </span>
          }
        />

        <Input
          className="input"
          name="jobTitle"
          placeholder="Job title"
          error={errors.jobTitle}
        />

        <div className="flex flex-col text-sm">
          <select name="gender" className="input">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <label className="flex flex-col items-center justify-center h-26 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 mt-5 m-1.9">
          <input
            type="file"
            name="profileImage"
            className="hidden"
            error={errors.profileImage}
            onChange={handleImageChange}
          />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
          ) : (
            <>
              <FiUpload className="mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload profile photo</p>
            </>
          )}
          {errors.profileImage && (
            <p className="text-red-500 text-xs mt-2 text-center">
              {errors.profileImage}
            </p>
          )}
        </label>
        <Button type="submit" className="w-full mt-4" loading={loading}>
          Signup
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
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
