import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtService.js";
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

    const { firstName, lastName, email, password, gender, jobTitle } =
      result.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
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
      data: user,
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
