import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createRazorpayOrder, razorpayWebhook, verifyPayment } from "../controllers/paymentController.js";

const router = Router();

router.post("/create-order", isAuthenticated, createRazorpayOrder)
router.post("/verify", isAuthenticated, verifyPayment)
router.post("/webhook", razorpayWebhook)

export default router;