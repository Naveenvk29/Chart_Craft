import { Router } from "express";
import {
  handleExcelUpload,
  fetchAllUserExcelFiles,
  fetchExcelFileById,
  removeExcelFile,
} from "../Controllers/excelControllers.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";
import { upload } from "../Middlewares/MulterMiddleware.js";

const router = Router();

// Upload Excel file
router.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  handleExcelUpload
);

// Get all Excel files for the user
router.get("/", isAuthenticated, fetchAllUserExcelFiles);

// Get a single Excel file by ID
router.get("/:id", isAuthenticated, fetchExcelFileById);

// Delete an Excel file by ID
router.delete("/:id", isAuthenticated, removeExcelFile);

export default router;
