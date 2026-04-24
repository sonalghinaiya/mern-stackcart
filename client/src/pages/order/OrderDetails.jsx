import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load order");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="w-6 h-6 text-amber-500" />,
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
          message: "Your order is pending confirmation",
        };
      case "processing":
        return {
          icon: <Package className="w-6 h-6 text-blue-500" />,
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
          message: "Your order is being prepared",
        };
      case "shipped":
        return {
          icon: <Truck className="w-6 h-6 text-indigo-500" />,
          color: "text-indigo-700",
          bg: "bg-indigo-50",
          border: "border-indigo-200",
          message: "Your order is on the way",
        };
      case "delivered":
        return {
          icon: <CheckCircle className="w-6 h-6 text-green-500" />,
          color: "text-green-700",
          bg: "bg-green-50",
          border: "border-green-200",
          message: "Your order has been delivered",
        };
      case "cancelled":
        return {
          icon: <XCircle className="w-6 h-6 text-red-500" />,
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
          message: "This order has been cancelled",
        };
      default:
        return {
          icon: <Package className="w-6 h-6 text-gray-500" />,
          color: "text-gray-700",
          bg: "bg-gray-50",
          border: "border-gray-200",
          message: "Order status unknown",
        };
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await api.patch(`/orders/${id}/cancel`);
      toast.success("Order cancelled successfully");
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 mt-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!order) return null;

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-6">
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </button>

      <div
        className={`${statusInfo.bg} ${statusInfo.border} border rounded-xl p-6 mb-6`}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">{statusInfo.icon}</div>
          <div className="flex-1">
            <h1 className={`text-2xl font-bold ${statusInfo.color} mb-1`}>
              Order {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </h1>
            <p className="text-gray-700">{statusInfo.message}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <span className="text-gray-600">
                Order Number: <strong className="text-gray-900">{order.orderNumber}</strong>
              </span>
              <span className="text-gray-600">
                Placed on:{" "}
                <strong className="text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </span>
            </div>
          </div>
          {order.status === "pending" && (
            <button
              onClick={handleCancelOrder}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 pb-4 border-b last:border-0 last:pb-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.price.toLocaleString("en-IN")} each
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-lg">Shipping Address</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-gray-900">
                {order.shippingInfo.fullName}
              </p>
              <p className="text-gray-600">{order.shippingInfo.address}</p>
              <p className="text-gray-600">
                {order.shippingInfo.city}, {order.shippingInfo.state} -{" "}
                {order.shippingInfo.pincode}
              </p>
              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-gray-600">{order.shippingInfo.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <p className="text-gray-600">{order.shippingInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₹{order.subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {order.shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${order.shipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST)</span>
                <span className="font-medium">
                  ₹{order.tax.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl text-indigo-600">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium">Payment Method</h3>
              </div>
              <p className="text-sm text-gray-600 capitalize">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "upi"
                  ? "UPI Payment"
                  : "Credit/Debit Card"}
              </p>
              <div className="mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Payment Pending"}
                </span>
              </div>
            </div>

            {order.deliveredAt && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <p className="text-sm text-gray-600">
                  Delivered on{" "}
                  <strong>
                    {new Date(order.deliveredAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}