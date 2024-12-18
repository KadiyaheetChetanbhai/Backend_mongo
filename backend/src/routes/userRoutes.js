import express from "express";
import { registerUser, loginUser,userlogout, resetpassword,forgotpassword,changepassword} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resetpassword",resetpassword);
router.post("/forgotpassword/:id/:token",forgotpassword);
router.post("/:id/:token",changepassword);


// Protected Routes
router.get("/logout", protect, userlogout);

export default router;