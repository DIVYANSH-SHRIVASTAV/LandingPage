import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Dashboard data
router.get("/dashboard", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ 
    message: `Welcome back, ${user.name}`, 
    email: user.email,
    joined: user.createdAt
  });
});

// Profile update
router.put("/profile", verifyToken, async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(req.user.userId, { name }, { new: true });
    res.json({ name: updated.name, email: updated.email });
  } catch {
    res.status(400).json({ error: "Profile update failed" });
  }
});

export default router;