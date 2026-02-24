import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, Package } from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-slate-300 min-h-screen p-6">

      <h1 className="text-xl font-bold text-white mb-10">
        StackCart
      </h1>

      <nav className="space-y-2 text-sm">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Users size={18} />
          Users
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive
                ? "bg-slate-800 text-white"
                : "hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Package size={18} />
          Products
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;