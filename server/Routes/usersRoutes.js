import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUser,
} from "../Controllers/usersControllers.js";
import { isAdmin, isAuthenticated } from "../Middlewares/authMiddleware.js";

const router = Router();

//Auth
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

//Profile
router
  .route("/profile")
  .get(isAuthenticated, getCurrentUserProfile)
  .put(isAuthenticated, updateCurrentUserProfile)
  .delete(isAuthenticated, deleteCurrentUser);

export default router;
