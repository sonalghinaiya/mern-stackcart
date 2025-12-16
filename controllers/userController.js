import { User } from "../models/user.js";

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
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    return res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
