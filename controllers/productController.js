import { Product } from "../models/product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, description, price, rating } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    rating,
  });
  console.log("Product...", product);
  return res
    .status(201)
    .json({ message: "Product created Successfully", data: product });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.json(product);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
  if (!updatedProduct)
    return res.status(404).json({ error: "Product not found" });
  return res.json({
    message: "Product updated successfully",
    data: updateProduct,
  });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  return res.json({ message: "Product deleted successfully" });
};
