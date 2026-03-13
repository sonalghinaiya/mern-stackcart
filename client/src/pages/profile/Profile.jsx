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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>
        {user.profileImage && (
          <div className="flex justify-center mb-4">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          {user.jobTitle && (
            <p>
              <span className="font-semibold">Job:</span> {user.jobTitle}
            </p>
          )}
          {user.gender && (
            <p>
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
          )}
        </div>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
