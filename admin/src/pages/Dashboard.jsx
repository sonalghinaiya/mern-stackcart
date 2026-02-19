import { useEffect, useState } from "react";
import api from "../api/axios";
import React from "react";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/stats");
      console.log("res.....", res)
      setStats(res.data.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3>Total Users</h3>
        <p className="text-2xl font-bold">{stats.users.total}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3>Total Products</h3>
        <p className="text-2xl font-bold">{stats.products.total}</p>
      </div>
    </div>
  );
}

export default Dashboard;
