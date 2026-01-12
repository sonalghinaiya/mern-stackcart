import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
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

router.post("/refresh", authLimiter, refreshAccessToken);
router.post("/logout", logout);

export default router;
