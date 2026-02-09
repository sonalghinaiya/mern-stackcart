import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FcGoogle } from "react-icons/fc";

function Register() {
  const navigate = useNavigate();

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
        <p className="text-gray-500 text-md text-center mb-2">
          Signup to your StackCart
        </p>
        <div>
          <label className="text-sm font-semibold">First Name</label>
          <input className="input mt-1" name="firstName" placeholder="Sonal" />
        </div>
        <div>
          <label className="text-sm font-semibold">Last Name</label>
          <input className="input" name="lastName" placeholder="Ghinaiya" />
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="sg@gmail.com"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Job Title</label>
          <input
            className="input"
            name="jobTitle"
            placeholder="MERN Developer"
          />
        </div>

        <div className="flex gap-4 text-sm m-2 ">
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Male" />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Female" />
            Female
          </label>
        </div>
        <div>
          <label className="text-sm text-gray-600 mt-1">Profile image</label>
          <input type="file" name="profileImage" className="mt-1" />
        </div>
        <button
          className="w-full bg-gray-800 text-white px-2 py-1.5 mt-4 rounded"
          type="submit"
        >
          Signup
        </button>
        <div className="relative my-4">
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
