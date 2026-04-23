import { Router } from "express";
import {
  cancelOrder,
  createOrder,
  getMyOrders,
  getOrderById
} from "../controllers/orderController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", isAuthenticated, createOrder);
router.get("/my-orders", isAuthenticated, getMyOrders);
router.get("/:id", isAuthenticated, getOrderById);
router.patch("/:id/cancel", isAuthenticated, cancelOrder);

export default router;
