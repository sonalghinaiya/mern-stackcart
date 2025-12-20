import { Product } from "../models/product.js";
import { productCreateSchema, productUpdateSchema } from "../validators/productValidation.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const result = productCreateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }
    const { name, description, price, rating } = result.data;
    const product = await Product.create({
      name,
      description,
      price,
      rating,
    });
    return res.status(201).json({
      success: true,
      message: "Product created Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    return res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = productUpdateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      result.data
    );
    if (!updatedProduct) {
      res.status(404);
      throw new Error("Product not found");
    }
    return res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
