import express from "express";
import { addItem, getItems, updateItem, deleteItem} from "../controllers/wardrobeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, addItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);
router.get("/", authMiddleware, getItems);

export default router;