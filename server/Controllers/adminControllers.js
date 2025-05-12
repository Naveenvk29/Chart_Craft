import User from "../Models/usermodel.js";
import ExcelFile from "../Models/excelModel.js";
import asyncHandler from "../Utils/asyncHandler.js";
import logAudit from "../Utils/logAudit.js";
import AuditLog from "../Models/auditLogModel.js";

//⬇️ Fetch add users
const fetchAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) return res.status(404).json({ error: "Error fetch user" });
  res.status(200).json(users);
});

//⬇️ Modify user details by admin
const modifyUserDetailsbyadmin = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.params.id).select("-password");

  if (!user) throw new Error("User not found");

  user.username = username || user.username;
  user.email = email || user.email;

  const updatedUser = await user.save();

  await logAudit({
    user: req.user,
    action: "MODIFY_USER",
    targetId: user._id,
    targetType: "User",
    description: `Admin updated user ${user.username}'s details`,
  });
  res.status(200).json({ message: "User updated", updatedUser });
});

//⬇️ remove any user
const removeAnyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("user not found");
  await ExcelFile.deleteMany({ user: user._id });
  await user.deleteOne();
  await logAudit({
    user: req.user,
    action: "DELETE_USER",
    targetId: user._id,
    targetType: "User",
    description: `Admin deleted user ${user.username} and their data`,
  });
  res.status(200).json({
    message: `${user.username || user.email} and associated data removed`,
  });
});

//⬇️ Modify user role
const modifyUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) throw new Error("user not found");

  if (!["user", "admin"].includes(role)) throw new Error("Invaild role");

  user.role = role;
  await user.save();

  await logAudit({
    user: req.user,
    action: "MODIFY_ROLE",
    targetId: user._id,
    targetType: "User",
    description: `Admin changed role of ${user.username} to ${role}`,
  });

  res
    .status(200)
    .json({ message: `Role updated to ${role} of ${user.username}` });
});

//⬇️ Fetch All Excel Files
const fetchAllExcelFiles = asyncHandler(async (req, res) => {
  const files = await ExcelFile.find().populate("user", "username email");

  res.status(200).json(files);
});

//⬇️
const removeAnyUserExcelFile = asyncHandler(async (req, res) => {
  const file = await ExcelFile.findById(req.params.id);
  if (!file) throw new Error("file not found");

  await file.deleteOne();

  await logAudit({
    user: req.user,
    action: "DELETE_FILE",
    targetId: file._id,
    targetType: "ExcelFile",
    description: `Admin deleted an Excel file of user ID ${file.user}`,
  });

  res.status(200).json({ message: "Excel file deleted" });
});

const viewAnalytics = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const adminsCount = await User.countDocuments({ role: "admin" });
  const normalUsersCount = await User.countDocuments({ role: "user" });

  const filesCount = await ExcelFile.countDocuments();
  const latestUploads = await ExcelFile.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("user", "username email");

  res.status(200).json({
    totalUsers: usersCount,
    admins: adminsCount,
    normalUsers: normalUsersCount,
    totalFiles: filesCount,
    recentUploads: latestUploads,
  });
});
//⬇️

const monitorUserActivity = asyncHandler(async (req, res) => {
  const activities = await AuditLog.find()
    .sort({ timestamp: -1 })
    .limit(50)
    .populate("user", "username email");

  const formattedActivities = activities.map((log) => ({
    user: log.user,
    action: log.action,
    description: log.description,
    time: log.timestamp,
  }));

  res.status(200).json({
    message: "Latest user activities",
    activities: formattedActivities,
  });
});

const getAuditLogs = asyncHandler(async (req, res) => {
  const logs = await AuditLog.find()
    .populate("user", "username email")
    .sort({ timestamp: -1 })
    .limit(100);

  res.status(200).json(logs);
});

export {
  fetchAllUser,
  modifyUserDetailsbyadmin,
  removeAnyUser,
  modifyUserRole,
  fetchAllExcelFiles,
  removeAnyUserExcelFile,
  viewAnalytics,
  monitorUserActivity,
  getAuditLogs,
};
