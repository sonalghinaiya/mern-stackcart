import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
const router = Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/login").post(loginUser)

router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
