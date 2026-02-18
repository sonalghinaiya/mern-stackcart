import { Router } from "express";
import {
  forgotPassword,
  googleLogin,
  login,
  logout,
  refreshAccessToken,
  register,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "../controllers/authController.js";
import { authLimiter, otpLimiter } from "../middlewares/rateLimiter.js";
import { uploadUser } from "../middlewares/upload.js";

const router = Router();

router.post(
  "/register",
  authLimiter,
  uploadUser.single("profileImage"),
  register,
);
router.post("/login", authLimiter, login);
router.post("/social-login", googleLogin)
router.post("/forgot-password", otpLimiter, forgotPassword);
router.post("/verify-otp", otpLimiter, verifyOtp);
router.post("/reset-password", otpLimiter, resetPassword);
router.post("/resend-otp", resendOtp)

router.post("/refresh", authLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;
