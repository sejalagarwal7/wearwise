
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authMiddleware from "./middleware/authMiddleware.js";
import wardrobeRoutes from "./routes/wardrobeRoutes.js";
import outfitRoutes from "./routes/outfitRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
console.log(process.env.MONGO_URI);
// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
cors({
origin: ["http://localhost:5173", "http://localhost:5174", "https://wearwise-mocha.vercel.app"],
credentials: true,
})
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/wardrobe", wardrobeRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/ai", aiRoutes);

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
app.use((err, req, res, next) => {
  console.error("ERROR:");
  console.dir(err, { depth: null });

  res.status(500).json({
    message: err.message,
    error: err,
  });
});