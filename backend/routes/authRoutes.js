import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  verifyOtp,
} from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { uploadUser } from "../middlewares/upload.js";

const router = Router();

router.post(
  "/register",
  authLimiter,
  uploadUser.single("profileImage"),
  register
);
router.post("/login", authLimiter, login);
router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

router.post("/refresh", authLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;
