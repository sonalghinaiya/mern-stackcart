import { useEffect, useState } from "react";
import api from "../api/axios";
import UsersChart from "@/components/charts/UsersChart";
import ProductsChart from "@/components/charts/ProductsChart";
import { Package, Users } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/stats");
      setStats(res.data.data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
      <p className="text-muted-foreground mb-6">
        Here's a summary of your store performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Total Users</h3>
              <p className="text-3xl font-bold mt-2">{stats?.users?.total}</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-muted-foreground">Total Products</h3>
              <p className="text-3xl font-bold mt-2">
                {stats?.products?.total}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-purple-100">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersChart />
        <ProductsChart />
      </div>
    </div>
  );
}

export default Dashboard;
