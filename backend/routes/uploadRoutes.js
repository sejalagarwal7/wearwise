import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage} from "../controllers/uploadController.js";
const router = express.Router();
router.post("/", authMiddleware, upload.single("image"), uploadImage);
router.post(
  "/",
  authMiddleware,
  (req, res, next) => {
    console.log("Route hit");
    next();
  },
  upload.single("image"),
  uploadImage
);
export default router;