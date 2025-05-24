import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  changePasswordCurrentUser,
  deleteCurrentUser,
  oauthLoginUser,
  updateSessionTime,
} from "../Controllers/usersControllers.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";
import { uploadImage } from "../Middlewares/multerImageMiddleware.js";

const router = Router();

//Auth
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.post("/oauth-login", oauthLoginUser);
//Profile
router
  .route("/profile")
  .get(isAuthenticated, getCurrentUserProfile)
  .put(
    uploadImage.single("profilePic"),
    isAuthenticated,
    updateCurrentUserProfile
  )
  .delete(isAuthenticated, deleteCurrentUser)
  .patch(isAuthenticated, changePasswordCurrentUser);

router.post("/session", isAuthenticated, updateSessionTime);

export default router;
