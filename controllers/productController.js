import { Product } from "../models/product.js";

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
    const { name, description, price, rating } = req.body;
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
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
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
