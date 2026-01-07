import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadProduct } from "../middlewares/upload.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(isAuthenticated, uploadProduct.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(isAuthenticated, uploadProduct.single("image"), updateProduct)
  .delete(isAuthenticated, deleteProduct);

export default router;