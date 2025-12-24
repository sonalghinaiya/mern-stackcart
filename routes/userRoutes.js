import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/").get(getAllUsers);

router
  .route("/:id")
  .get(getUserById)
  .patch(isAuthenticated, updateUser)
  .delete(isAuthenticated, deleteUser);

export default router;
