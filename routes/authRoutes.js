import { Router } from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/refresh", refreshAccessToken)
router.post("/logout", logout)

export default router;
