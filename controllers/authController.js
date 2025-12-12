import { User } from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.password ||
    !body.gender ||
    !body.jobTitle
  ) {
    return res.status(400).json({ message: "All fields are required..." });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: hashedPassword,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({
    message: "Success",
    data: result,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ error: "Invalid email and Password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ error: "Invalid email and Password" });

  return res.json(user);
};