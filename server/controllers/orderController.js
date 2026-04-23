import { Order } from "../models/order.js";

export const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    if (!shippingInfo) {
      return res.status(400).json({
        success: false,
        message: "Shipping information is required",
      });
    }
    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create({
      user: req.user._id,
      orderNumber,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Place Order successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = (req, res) => {};
export const cancelOrder = (req, res) => {};
export const getAllOrders = (req, res) => {};
export const updateOrderStatus = (req, res) => {};
