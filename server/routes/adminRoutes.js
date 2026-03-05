import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import {
  adminGetAllProducts,
  adminGetAllUsers,
  getAdminStats,
  updateUserRole,
} from "../controllers/adminController.js";

const router = Router();

router.use(isAuthenticated);
router.use(isAdmin);

router.get("/users", adminGetAllUsers);
router.get("/products", adminGetAllProducts);
router.get("/stats", getAdminStats);

router.patch("/users/:id/role", updateUserRole)

export default router;
