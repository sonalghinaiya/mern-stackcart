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
  console.log("Product...", product)
  return res
    .status(201)
    .json({ message: "Product created Successfully", data: product });
};
