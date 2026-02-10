import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FcGoogle } from "react-icons/fc";
import { FiUpload } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await api.post("/auth/register", formData);

      navigate("/login");
    } catch (error) {
      console.log(error);
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
          <input className="input" name="firstName" placeholder="First name" />
          <input className="input" name="lastName" placeholder="Last name" />
        </div>

        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
        />

        <div className="relative">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-2 -translate-y-1/2 top-1/2 text-gray-600"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        <input className="input" name="jobTitle" placeholder="Job title" />

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
        </label>

        <button
          className="w-full bg-gray-800 text-white px-2 py-1.5 mt-4 rounded"
          type="submit"
        >
          Signup
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
