import express from "express";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT;
const url = process.env.MONGODB_URI;

connectDB(url).then(() => console.log("MongoDB Connected!"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
