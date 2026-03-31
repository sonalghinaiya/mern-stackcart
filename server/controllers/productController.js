import { Product } from "../models/product.js";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../validators/productValidation.js";

export const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = {};

    if (req.user?.role !== "admin") {
      query.isDeleted = false;
    }

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.rating) {
      query.rating = req.query.rating;
    }

    if (req.query.priceMin || req.query.priceMax) {
      query.price = {};
      if (req.query.priceMin) {
        query.price.$gte = req.query.priceMin;
      }
      if (req.query.priceMax) {
        query.price.$lte = req.query.priceMax;
      }
    }
    const totalItems = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const sort = { [sortBy]: order };

    const products = await Product.find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false }).limit(3);

    return res.json({
      success: true,
      data: products,
    });
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

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required.",
      });
    }
    const { name, description, price, rating } = result.data;

    // const image = `uploads/products/${req.file.filename}`;
    const image = req.file.path;
    const product = await Product.create({
      name,
      description,
      price,
      rating,
      image,
      createdBy: req.user.id,
    });

    const protocol = req.protocol;
    const hostName = req.host;
    const imageUrl = `${protocol}://${hostName}/${product.image}`;
    return res.status(201).json({
      success: true,
      message: "Product created Successfully",
      data: product,
      // data: { ...product.toObject(), image: imageUrl },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
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

    const { name, description, price, rating } = result.data;

    const product = await Product.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (
      product.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("You can not allowed to update this product");
    }

    let imagePath = product.image;

    if (req.file) {
      imagePath = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        rating,
        image: imagePath,
      },
      { new: true },
    );

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
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (
      product.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("You are not allowed to delete this product");
    }

    product.isDeleted = true;
    await product.save();
    // if (product.image) {
    //   const filePath = path.join(process.cwd(), "public", product.image);
    //   try {
    //     await fs.unlink(filePath);
    //     console.log("Product Image deleted:", filePath);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

    // await product.deleteOne();
    return res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const query = {};

    if (req.user?.role !== "admin") {
      query.isDeleted = false;
    }

    if (req.query.firstName) {
      query.firstName = { $regex: req.query.firstName, $options: "i" };
    }

    if (req.query.lastName) {
      query.lastName = { $regex: req.query.lastName, $options: "i" };
    }

    if (req.query.email) {
      query.email = { $regex: req.query.email, $options: "i" };
    }

    if (req.query.role) {
      query.role = req.query.role;
    }

    if (req.query.gender) {
      query.gender = { $regex: req.query.gender, $options: "i" };
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const sort = { [sortBy]: order };

    const user = await User.find(query)
      .select("-password")
      .sort(sort)
      .skip(offset)
      .limit(limit);

    return res.json({
      success: true,
      data: user,
      pagination: {
        page,
        limit,
        totalPages,
        totalUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};
