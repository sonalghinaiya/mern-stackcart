import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController.js";

const router = Router()

router.route("/").get(getProducts).post(createProduct)

export default router