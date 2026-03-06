import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import {
  getAdminStats,
  updateUserRole,
} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/userController.js";
import { getProducts } from "../controllers/productController.js";

const router = Router();

router.use(isAuthenticated);
router.use(isAdmin);

// router.get("/users", adminGetAllUsers);
// router.get("/products", adminGetAllProducts);
router.get("/users", getAllUsers);
router.get("/products", getProducts);
router.get("/stats", getAdminStats);

router.patch("/users/:id/role", updateUserRole);

export default router;
