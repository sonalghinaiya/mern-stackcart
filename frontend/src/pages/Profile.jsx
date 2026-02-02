import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <h2>Profile Page</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
