import User from "../Models/usermodel.js";
import asyncHandler from "../Utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {});

const loginUser = asyncHandler(async (req, res) => {});

const logoutUser = asyncHandler(async (req, res) => {});

const getAllUsers = asyncHandler(async (req, res) => {});

const getUserProfile = asyncHandler(async (req, res) => {});

const updateUserProfile = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, res) => {});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
