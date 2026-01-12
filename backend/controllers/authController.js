import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwtService.js";
import { loginSchema, registerSchema } from "../validators/authValidation.js";

export const register = async (req, res, next) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile Image is required.",
      });
    }
    const { firstName, lastName, email, password, gender, jobTitle } =
      result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = `uploads/users/${req.file.filename}`;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      jobTitle,
      profileImage,
    });

    const protocol = req.protocol;
    const hostName = req.host;
    const imageUrl = `${protocol}://${hostName}/${user.profileImage}`;
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        ...user.toObject(),
        profileImage: imageUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
      });
    }
    const { email, password } = result.data;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email and Password");
    }

    if (user.isDeleted) {
      res.status(403);
      throw new Error("Account has been deleted");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email and Password");
    }

    const accessToken = generateToken(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_ACCESS_EXPIRES_IN
    );

    const refreshToken = generateToken(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("refresh token", refreshToken);

    if (!refreshToken) {
      res.status(401);
      throw new Error("Refresh Token Missing");
    }

    const decoded = verifyToken(refreshToken);
    console.log("decoded..", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    const newAccessToken = generateToken(
      { id: decoded.id, role: decoded.role, email: decoded.email },
      process.env.JWT_ACCESS_EXPIRES_IN
    );

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
