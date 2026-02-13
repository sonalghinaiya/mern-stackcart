import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadUser } from "../middlewares/upload.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
const router = Router();

router.route("/").get(isAuthenticated, isAdmin, getAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(isAuthenticated, uploadUser.single("profileImage"), updateUser)
  .delete(isAuthenticated, deleteUser);

export default router;
