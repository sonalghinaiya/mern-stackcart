import { useEffect, useState } from "react";
import api from "../api/axios";
import UsersChart from "@/components/charts/UsersChart";
import ProductsChart from "@/components/charts/ProductsChart";
import { Package, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground mb-6">
            Welcome back! Here's what's happening in your store today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/users"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
          >
            <Users className="w-3.5 h-3.5" /> Users
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Products
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-blue-100 w-fit">
              <Users className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground font-medium">
                Total Users
              </h3>
              <p className="text-3xl font-bold mt-1">{stats?.users?.total}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                Registered accounts
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-purple-100 w-fit">
              <Package className="h-6 w-6 text-purple-600" />
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground font-medium">
                Total Products
              </h3>
              <p className="text-3xl font-bold mt-1">
                {stats?.products?.total}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Available in store
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-green-100 w-fit">
              <Package className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h3 className="text-sm text-muted-foreground font-medium">
                Total Orders
              </h3>
              <p className="text-3xl font-bold mt-1">-</p>
              <p className="text-muted-foreground mt-1 text-xs">
                API coming soon
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/5">
          <UsersChart />
        </div>
        <div className="lg:w-2/5">
          <ProductsChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
