import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const url = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser)

app.get("/", (req, res) => {
  res.json({ success: true, message: "API Running" });
});

connectDB(url).then(() => console.log("MongoDB Connected!"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
