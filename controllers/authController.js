import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtService.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, gender, jobTitle } = req.body;
    if (!firstName || !email || !password) {
      res.status(400);
      throw new Error("Required fields are missing");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      jobTitle,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid email and Password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email and Password");
    }

    const token = generateToken({ id: user.id, email: user.email });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
