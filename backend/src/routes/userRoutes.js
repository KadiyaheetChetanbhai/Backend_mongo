import express from "express";
import { registerUser, loginUser, getUserProfile,userlogout } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", protect, getUserProfile);
router.get("/logout", protect, userlogout);

export default router;
