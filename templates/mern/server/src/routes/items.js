import { Router } from "express";
import Item from "../models/Item.js";

const router = Router();

router.get("/",        async (req, res) => { res.json(await Item.find().sort({ createdAt: -1 })); });
router.get("/:id",     async (req, res) => { const i = await Item.findById(req.params.id); i ? res.json(i) : res.status(404).json({ error: "Not found" }); });
router.post("/",       async (req, res) => { try { res.status(201).json(await Item.create(req.body)); } catch (e) { res.status(400).json({ error: e.message }); } });
router.patch("/:id",   async (req, res) => { const i = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); i ? res.json(i) : res.status(404).json({ error: "Not found" }); });
router.delete("/:id",  async (req, res) => { const i = await Item.findByIdAndDelete(req.params.id); i ? res.json({ message: "Deleted" }) : res.status(404).json({ error: "Not found" }); });

export default router;
