import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authMiddleware from "./middleware/authMiddleware.js";
import wardrobeRoutes from "./routes/wardrobeRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wardrobe", wardrobeRoutes);
app.use("/api/outfits", outfitRoutes);
app.use(
cors({
origin: "http://localhost:5173",
credentials: true,
})
);

// Home Route
app.get("/", (req, res) => {
res.send("WearWise API Running");
});


app.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Route",
      userId: req.userId,
    });
  }
);

// Check DB Connection
app.get("/db-status", (req, res) => {
const state = mongoose.connection.readyState;

const status = {
0: "Disconnected",
1: "Connected",
2: "Connecting",
3: "Disconnecting",
};

res.json({
mongoStatus: status[state],
});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
