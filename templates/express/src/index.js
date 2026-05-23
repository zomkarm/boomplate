import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ─────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Server is running ✓", env: process.env.NODE_ENV || "development" });
});

app.use("/api", apiRouter);

// ── 404 ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Error handler ──────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
