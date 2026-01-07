import { Router } from "express";
import { chatWithAI } from "../controllers/chatController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", isAuthenticated, chatWithAI);

export default router;
