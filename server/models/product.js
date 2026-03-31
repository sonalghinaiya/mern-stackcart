import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "This Product offers great quality and value for everyday use.",
    },
    longDescription: {
      type: String,
      default:
        "This is a high-quality product designed to meet your needs. It offers excellent performance, durability, and value for money, Perfect for daily use with reliable functionality and modern design.",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isBestSeller: {
      type: Boolean,
      default: true,
    },
    brand: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("product", productSchema);
