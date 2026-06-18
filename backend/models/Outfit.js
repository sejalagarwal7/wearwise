import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
    {
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
name: {
type: String,
required: true,
},

items: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "WardrobeItem",
},
],

favorite: {
type: Boolean,
default: false,
},
},
 {
timestamps: true,
 }
);

export default mongoose.model(
    "Outfit", outfitSchema
);