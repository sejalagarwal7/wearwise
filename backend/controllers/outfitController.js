import Outfit from "../models/Outfit.js";

export const createOutfit = async (
    req, res) => {
    try {
const outfit = await Outfit.create({
user: req.userId,
name: req.body.name,
items: req.body.items,
favorite:
req.body.favorite || false,
});
res.status(201).json(outfit);
    } catch (error) {
    res.status(500).json({
    message: error.message,
    });
    }
    };

export const getOutfits = async (
  req,
  res
) => {
  try {
    const outfits = await Outfit.find({
      user: req.userId,
    }).populate("items");

    res.json(outfits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOutfit = async (
  req,
  res
) => {
  try {
    await Outfit.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Outfit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};