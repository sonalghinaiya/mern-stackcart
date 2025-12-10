import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect("mongodb://127.0.0.1:27017/user-crud")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.json());

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
${allDbUsers
  .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
  .join("")}
    </ul>
  `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.post("/api/user", async (req, res) => {
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
    return res.status(400).json({ message: "All fiels are required..." });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });

  return res.status(201).json({
    message: "Success",
    data: result,
  });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({
      message: "User updated successfully",
      data: user,
    });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User deleted successfully" });
  });

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
