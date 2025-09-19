import express from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  requestDeleteAccount,
  confirmDeleteAccount,
  refreshAccessToken,   // ✅ new
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../utils/auth.utils.js";

const router = express.Router();

// ========== AUTH ROUTES ==========
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAccessToken);

// ========== PASSWORD MANAGEMENT ==========
router.post("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ========== ACCOUNT DELETION ==========
router.post("/request-delete", authMiddleware, requestDeleteAccount);
router.post("/confirm-delete", confirmDeleteAccount);

export default router;
