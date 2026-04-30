import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { createRazorpayOrder } from "../controllers/paymentController";

const router = Router();

router.post("/create-order", isAuthenticated, createRazorpayOrder)