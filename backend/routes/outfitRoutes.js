import express from "express";
import {
 createOutfit,
  getOutfits,
  deleteOutfit,
} from "../controllers/outfitController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post(
  "/",
  authMiddleware,
  createOutfit
);

router.get(
  "/",
  authMiddleware,
  getOutfits
);

router.delete(
  "/:id",
  authMiddleware,
  deleteOutfit
);
export default router;
