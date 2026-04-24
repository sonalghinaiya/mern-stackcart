import { Order } from "../models/order.js";

export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress,
      paymentMethod,
    } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items provided",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping information is required",
      });
    }
    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create({
      user: req.user.id,
      orderNumber,
      items,
      subtotal,
      shipping,
      tax,
      total,
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
    const orders = await Order.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
// export const cancelOrder = (req, res) => {};
// export const getAllOrders = (req, res) => {};
// export const updateOrderStatus = (req, res) => {};
