import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../Controllers/usersControllers.js";

const router = Router();

//Auth
router.route("/").post(registerUser).get(getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

//Profile
router
  .route("/profile")
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUser);
