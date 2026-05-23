import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import itemRoutes from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ── DB ──────────────────────────────────────────
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ── Routes ─────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "API running ✓" }));
app.use("/api/items", itemRoutes);

// ── 404 + Error ────────────────────────────────
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ── Start ──────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
});
