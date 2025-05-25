import User from "../Models/usermodel.js";
import asyncHandler from "../Utils/asyncHandler.js";
import admin from "../libs/firebaseAdmin.js";
import logAudit from "../Utils/logAudit.js";
import { uplaodProfiePic, deleteProfilePic } from "../Utils/cloudinary.js";
import crypto from "crypto";
import sendEmail from "../Utils/sendEmail.js";

// ✅ user register controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user = new User({
    username,
    email,
    password,
  });

  try {
    await user.save();
    const token = user.generateToken(user._id);

    await logAudit({
      user,
      action: "REGISTER",
      targetId: user._id,
      targetType: "User",
      description: `User ${user.username} registered successfully.`,
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        totalTimeSpent: user.totalTimeSpent,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
    });
    console.error("Registration Error:", error);
  }
});

// 👤 user login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { rememberMe } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email });

  if (user) {
    const ispasswordMatch = await user.isPasswordCorrect(password);
    if (ispasswordMatch) {
      const token = user.generateToken(user._id);
      // Log the login action
      await logAudit({
        user,
        action: "LOGIN",
        targetId: user._id,
        targetType: "User",
        description: `User ${user.username} logged in successfully.`,
      });
      res.cookie("jwt", token, {
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          totalTimeSpent: user.totalTimeSpent,
          profilePic: user.profilePic,
        },
      });
    } else {
      return res.status(401).json({
        message: "user Credentials are not correct",
      });
    }
  } else {
    return res.status(401).json({
      message: "user not found",
    });
  }
});

// ❌ user logout controller
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
});

// 🧔🏻 get  Current  controller
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    },
  });
});

// 🧑🏻‍🏫 update Current  controller
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (req.file) {
    if (user.profilePic?.public_id) {
      await deleteProfilePic(user.profilePic.public_id);
    }
    const profilePicture = await uplaodProfiePic(req.file);
    if (!profilePicture) {
      res.status(400);
      throw new Error("Failed to upload profile picture");
    }
    user.profilePic = profilePicture;
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  const updatedUser = await user.save();
  // Log the update action
  await logAudit({
    user,
    action: "UPDATE_PROFILE",
    targetId: user._id,
    targetType: "User",
    description: `User ${user.username} updated their profile.`,
  });

  res.status(200).json({
    message: "User updated successfully",
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePic: updatedUser.profilePic,
    },
  });
});

// 🔒 change password Current controller

const changePasswordCurrentUser = asyncHandler(async (req, res) => {
  const newPassword = req.body.newPassword;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({
    message: "Password updated successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
    },
  });
});

// 🚮 delete Current controller
const deleteCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.profilePic?.public_id) {
    await deleteProfilePic(user.profilePic.public_id);
  }

  await user.deleteOne();
  await logAudit({
    user,
    action: "DELETE_USER",
    targetId: user._id,
    targetType: "User",
    description: `User ${user.username} deleted their account.`,
  });
  res.status(200).json({
    message: `${user.username} deleted successfully`,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    },
  });
});

// Oauth login

const oauthLoginUser = asyncHandler(async (req, res) => {
  const { firebaseIdToken } = req.body;

  if (!firebaseIdToken) {
    return res.status(400).json({ message: "Firebase ID token is missing" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);
    const { email, name, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        password: uid, // Replace this logic with secure handling
      });
    }

    const token = user.generateToken(user._id);

    // Log the OAuth login action
    await logAudit({
      user,
      action: "OAUTH_LOGIN",
      targetId: user._id,
      targetType: "User",
      description: `User ${user.username} logged in via OAuth (Google).`,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logged in with Google",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        totalTimeSpent: user.totalTimeSpent,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("🔥 Google Login Error:", error);
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
});

const updateSessionTime = asyncHandler(async (req, res) => {
  const { duration } = req.body;
  const userId = req.user._id;
  if (!userId || !duration) {
    return res.status(400).json({ message: "userId and duration required" });
  }

  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  user.totalTimeSpent = (user.totalTimeSpent || 0) + duration;
  user.lastActiveAt = new Date();

  await user.save();

  res.status(200).json({ message: "Session updated", user });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}`;

  await sendEmail(
    user.email,
    "Password Reset",
    `Click here to reset your password: <a href="${resetUrl}">Reset Password</a>`
  );
  res.status(200).json({
    message: "Password reset link sent to your email",
  });
});

// Reset password controller
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      message: "Token and new password are required",
    });
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired password reset token",
    });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  await logAudit({
    user,
    action: "RESET_PASSWORD",
    targetId: user._id,
    targetType: "User",
    description: `User ${user.username} reset their password successfully.`,
  });
  res.status(200).json({
    message: "Password has been reset successfully",
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  changePasswordCurrentUser,
  deleteCurrentUser,
  oauthLoginUser,
  updateSessionTime,
  forgetPassword,
  resetPassword,
};
