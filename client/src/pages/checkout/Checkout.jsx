import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, Package, Shield, ArrowLeft } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../api/axios";

function Checkout() {
  const navigate = useNavigate();
  const { cartItem, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.firstName + " " + (user?.lastName || "") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const validateShipping = () => {
    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      toast.error("Please fill all required fields");
      return false;
    }
    if (shippingInfo.pincode.length !== 6) {
      toast.error("Invalid pincode");
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setCurrentStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const orderData = {
        items: cartItem.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress: shippingInfo,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total,
      };
      console.log("Order Data", orderData);
      const res = await api.post("/orders", orderData);
      toast.success(res.data.message || "Order placed successfully!");
      clearCart();
      navigate("/order-success");
      // navigate("/order-success", {
      //   state: {
      //     orderNumber: res.data.data.orderNumber,
      //     total: res.data.data.total,
      //   },
      // });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-6">
      <div className="mb-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <span
              className={`hidden sm:inline ${
                currentStep >= 1 ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              Shipping
            </span>
          </div>

          <div className="w-12 h-0.5 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <span
              className={`hidden sm:inline ${
                currentStep >= 2 ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              Payment
            </span>
          </div>

          <div className="w-12 h-0.5 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              3
            </div>
            <span
              className={`hidden sm:inline ${
                currentStep >= 3 ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              Review
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold">Shipping Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingInfo.pincode}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="400001"
                      maxLength="6"
                    />
                  </div>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Pay when you receive
                      </p>
                    </div>
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("upi")}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    paymentMethod === "upi"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">UPI Payment</p>
                      <p className="text-sm text-gray-500">
                        Pay via Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Credit/Debit Card
                      </p>
                      <p className="text-sm text-gray-500">
                        Visa, Mastercard, Rupay
                      </p>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-4 space-y-3 pl-7">
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        placeholder="Card Number"
                        maxLength="16"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        name="cardName"
                        value={cardDetails.cardName}
                        onChange={handleCardChange}
                        placeholder="Cardholder Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="CVV"
                          maxLength="3"
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Shipping Details</h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">
                    {shippingInfo.fullName}
                  </p>
                  <p>{shippingInfo.address}</p>
                  <p>
                    {shippingInfo.city}, {shippingInfo.state} -{" "}
                    {shippingInfo.pincode}
                  </p>
                  <p>{shippingInfo.phone}</p>
                  <p>{shippingInfo.email}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Payment Method</h3>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-indigo-600 text-sm hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-gray-600">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod === "upi"
                      ? "UPI Payment"
                      : "Credit/Debit Card"}
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition font-medium text-lg disabled:bg-gray-400"
              >
                {loading
                  ? "Processing..."
                  : `Place Order - ₹${total.toLocaleString("en-IN")}`}
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your payment information is secure</span>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cartItem.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (GST 18%)</span>
                <span className="font-medium">
                  ₹{tax.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl text-indigo-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
