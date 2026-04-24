import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 text-amber-700" />;
      case "processing":
        return <Package className="w-3 h-3 text-blue-700" />;
      case "shipped":
        return <Truck className="w-3 h-3 text-indigo-700" />;
      case "delivered":
        return <CheckCircle className="w-3 h-3 text-green-700" />;
      case "cancelled":
        return <XCircle className="w-3 h-3 text-red-700" />;
      default:
        return <Package className="w-3 h-3 text-gray-700" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-indigo-100 text-indigo-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.patch(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-6xl mx-auto px-4 py-8 mt-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600">
            Track and manage your orders ({orders.length} total)
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven’t placed any orders yet. Start shopping and
              your orders will appear here.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl border border-gray-200 px-6 py-4 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-2">
                      <h3 className="font-bold text-md">{order.orderNumber}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                          order.orderStatus,
                        )}`}
                      >
                        {getStatusIcon(order.orderStatus)}
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-2 gap-3">
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="flex items-center justify-center gap-2 px-2 py-1 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-2xl font-bold">
                      ₹{order.total.toLocaleString("en-IN")}
                    </p>
                  </div>
                  {/* {order.orderStatus === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    Cancel Order
                  </button>
                )} */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
