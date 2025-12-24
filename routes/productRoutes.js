import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(getProducts).post(isAuthenticated, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

export default router;