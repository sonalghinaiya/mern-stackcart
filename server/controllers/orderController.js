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
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
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

export const cancelOrder = async (req, res, next) => {
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

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    order.orderStatus = "cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllOrders = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = {};

    if (req.query.orderStatus) {
      query.orderStatus = req.query.orderStatus;
    }

    if (req.query.orderNumber) {
      query.orderNumber = {
        $regex: req.query.orderNumber,
        $options: "i",
      };
    }

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / limit);

    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const sort = { [sortBy]: order };

    const orders = await Order.find(query)
      .populate("user", "firstName lastName email")
      .sort(sort)
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        totalPages,
        totalOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    if (orderStatus === "delivered") {
      order.paymentStatus = "paid";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
