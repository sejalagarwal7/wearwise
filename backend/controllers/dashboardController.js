import WardrobeItem from "../models/WardrobeItem.js";
import Outfit from "../models/Outfit.js";

export const getStats = async (req, res) => {
  try {
    const totalClothes =
      await WardrobeItem.countDocuments({
        user: req.userId,
      });

    const savedOutfits =
      await Outfit.countDocuments({
        user: req.userId,
      });

    res.json({
      totalClothes,
      savedOutfits,
      favoriteItems: 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};