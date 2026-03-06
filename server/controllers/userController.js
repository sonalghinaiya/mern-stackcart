import { User } from "../models/user.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
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

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
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
    const user = await User.findOne({ _id: req.params.id, isDeleted: false });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    let profileImage = user.profileImage;

    if (req.file) {
      profileImage = req.file.path;
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        profileImage,
      },
      { new: true },
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
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.isDeleted = true;
    await user.save();
    // if (user.profileImage) {
    //   const filePath = path.join(process.cwd(), "public", user.profileImage);
    //   try {
    //     await fs.unlink(filePath);
    //     console.log("Profile image deleted:", filePath);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // }

    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
