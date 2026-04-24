import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  ChevronRight,
  Clock,
  Settings,
  Truck,
  CheckCircle2,
} from "lucide-react";

import toast from "react-hot-toast";
import ProtectedRoutes from "../../components/auth/ProtectedRoutes";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Orders from "../order/Orders";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await api.patch(`/users/${user._id}`, {
        firstName,
        lastName,
      });

      updateUser(res.data.data);

      toast.success(res.data.message || "Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            <div>
              <div className="bg-white rounded-2xl p-5 shadow mb-4 text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                  {user?.firstName?.[0]}
                </div>

                <h3 className="mt-3 font-semibold">
                  {user?.firstName} {user?.lastName}
                </h3>

                <p className="text-xs text-gray-500">{user?.email}</p>

                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full mt-2 inline-block">
                  {user?.role}
                </span>
              </div>

              <div className="bg-white rounded-2xl shadow overflow-hidden">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm 
                       ${
                         activeTab === "profile"
                           ? "bg-indigo-50 text-indigo-600"
                           : "hover:bg-gray-50"
                       }`}
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                  <ChevronRight className="ml-auto w-3 h-3" />
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm
                  ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  My Orders
                  <ChevronRight className="ml-auto w-3 h-3" />
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {activeTab === "profile" && (
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-bold text-gray-900 mb-5">
                    Profile Settings
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">
                        Full Name
                      </label>
                      <div className="flex gap-2">
                        <input
                          name="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                        <input
                          name="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-600 mb-1 block">
                        Email
                      </label>
                      <input
                        defaultValue={user?.email}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="lg:col-span-3 -mt-15">
                <Orders />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
