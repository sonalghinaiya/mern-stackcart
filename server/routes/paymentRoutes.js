import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";

const router = Router();

router.post("/create-order", isAuthenticated, createRazorpayOrder)
router.post("/verify", isAuthenticated, verifyPayment)

export default router;