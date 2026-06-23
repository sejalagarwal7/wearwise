import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { analyzeImage, analyzeLink } from "../controllers/aiController.js";

const router = express.Router();

// Protected AI routes
router.post("/analyze-image", authMiddleware, upload.single("image"), analyzeImage);
router.post("/analyze-link", authMiddleware, analyzeLink);

export default router;
