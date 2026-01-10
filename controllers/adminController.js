import { Product } from "../models/product.js";
import { User } from "../models/user.js";

export const adminGetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
export const adminGetAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
export const getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isDeleted: false });
    const deletedUsers = await User.countDocuments({ isDeleted: true });

    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isDeleted: false });
    const deletedProducts = await Product.countDocuments({ isDeleted: true });

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          active: activeUsers,
          deleted: deletedUsers,
        },
        products: {
          total: totalProducts,
          active: activeProducts,
          deleted: deletedProducts,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
