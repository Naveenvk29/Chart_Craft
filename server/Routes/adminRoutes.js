import express from "express";
import {
  fetchAllUser,
  modifyUserDetailsbyadmin,
  removeAnyUser,
  modifyUserRole,
  fetchAllExcelFiles,
  removeAnyUserExcelFile,
  viewAnalytics,
  monitorUserActivity,
  getAuditLogs,
} from "../Controllers/adminControllers.js";
import { isAuthenticated, isAdmin } from "../Middlewares/authMiddleware.js";

const router = express.Router();
// user
router.get("/users", isAuthenticated, isAdmin, fetchAllUser);
router.put("/user/:id", isAuthenticated, isAdmin, modifyUserDetailsbyadmin);
router.delete("/user/:id", isAuthenticated, isAdmin, removeAnyUser);
router.patch("/user/:id/role", isAuthenticated, isAdmin, modifyUserRole);

// excels
router.get("/excels", isAuthenticated, isAdmin, fetchAllExcelFiles);
router.delete("/excel/:id", isAuthenticated, isAdmin, removeAnyUserExcelFile);

router.get("/analytics", isAuthenticated, isAdmin, viewAnalytics);
router.get("/monitor", isAuthenticated, isAdmin, monitorUserActivity);
router.get("/log", isAuthenticated, isAdmin, getAuditLogs);

export default router;
