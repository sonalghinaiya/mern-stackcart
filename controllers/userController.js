import { User } from "../models/user.js";
import path from "path";
import fs from "fs/promises";

export const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user.id && req.user.role !== "admin") {
      res.status(403);
      throw new Error("You can update only your own profile");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    let profileImage = user.profileImage;

    if (req.file) {
      if (user.profileImage) {
        const oldPath = path.join(process.cwd(), "public", user.profileImage);
        try {
          await fs.unlink(oldPath);
        } catch (error) {
          console.log("Old image not found");
        }
      }
      profileImage = `uploads/users/${req.file.filename}`;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        profileImage,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id !== req.user.id && req.user.role !== "admin") {
      res.status(403);
      throw new Error("You can delete only your own account");
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.profileImage) {
      const filePath = path.join(process.cwd(), "public", user.profileImage);
      try {
        await fs.unlink(filePath);
        console.log("Profile image deleted:", filePath);
      } catch (error) {
        console.log(error.message);
      }
    }

    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
