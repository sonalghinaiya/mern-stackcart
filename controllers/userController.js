import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
};

export const createUser = async (req, res) => {
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ error: "Invalid email and Password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ error: "Invalid email and Password" });

  return res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json({ message: "User deleted successfully" });
};
