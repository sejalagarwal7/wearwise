import mongoose from "mongoose";

const wardrobeItemSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},

imageUrl: {
type: String,
},

category: {
type: String,
enum: [
"Tops",
"Bottoms",
"Shoes",
"Outerwear"
],
required: true,
},

color: {
type: String,
},

season: {
type: String,
},
occasion: {
type: String,
},
},
 {
timestamps: true,
 }
);

export default mongoose.model(
    "WardrobeItem", wardrobeItemSchema
);