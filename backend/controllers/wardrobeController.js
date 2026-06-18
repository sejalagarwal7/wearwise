import WardrobeItem from "../models/WardrobeItem.js";

// Add Clothing Item
export const addItem = async (req, res) => {
  try {
    const item = await WardrobeItem.create({
      ...req.body,
      user: req.userId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Clothing Items
export const getItems = async (req, res) => {
  try {
    const items = await WardrobeItem.find({
      user: req.userId,
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update
export const updateItem = async (req, res) => {
try {
const item = await WardrobeItem.findOneAndUpdate(
{
_id: req.params.id,
user: req.userId,
},
req.body,
{
new: true,
}
);
if(!item) {
return res.status(404).json({
message: "Item not found",
});
}
res.status(200).json(item);
} catch(error) {
res.status(500).json({
message: error.message,
});
}
};
export const deleteItem = async (req, res) => {
  try {
    const item = await WardrobeItem.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

