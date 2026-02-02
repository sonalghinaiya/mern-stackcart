import React from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h2>Register</h2>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Firstname" />
        <input type="text" name="lastName" placeholder="Lastname" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="text" name="jobTitle" placeholder="Job Title" />
        <label>
          <input type="radio" name="gender" value="Male" />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="Female" />
          Female
        </label>
        <input type="file" name="profileImage" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
