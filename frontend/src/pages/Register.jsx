import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>
        <p className="text-gray-500 text-sm text-center mb-4">
          Create your account to get started
        </p>
        <input
          className="input"
          type="text"
          name="firstName"
          placeholder="First name"
        />
        <input
          className="input"
          type="text"
          name="lastName"
          placeholder="Last name"
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className="input"
          type="text"
          name="jobTitle"
          placeholder="Job Title"
        />

        <div className="flex gap-4 mt-2">
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Male" />
            Male
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="gender" value="Female" />
            Female
          </label>
        </div>
        <label className="text-sm text-gray-600 mt-2 block">
          Profile image
        </label>
        <input type="file" name="profileImage" />
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
