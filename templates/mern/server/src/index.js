import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import itemRoutes from "./routes/items.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ── DB ──────────────────────────────────────────
await mongoose.connect(process.env.MONGO_URI).then(() =>
  console.log("✅ MongoDB connected")
).catch((e) => {
  console.error("❌ MongoDB:", e.message);
  process.exit(1);
});

// ── Middleware ──────────────────────────────────
app.use(cors({ origin: "http://localhost:5173" }));
app.use(morgan("dev"));
app.use(express.json());

// ── Routes ─────────────────────────────────────
app.get("/", (req, res) => res.json({ ok: true }));
app.use("/api/items", itemRoutes);

// ── 404 + Error ────────────────────────────────
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));

app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
