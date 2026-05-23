import { Router } from "express";

const router = Router();

// GET /api/items
router.get("/items", (req, res) => {
  res.json({ items: [{ id: 1, name: "Sample item" }] });
});

// POST /api/items
router.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });
  res.status(201).json({ id: Date.now(), name });
});

export default router;
