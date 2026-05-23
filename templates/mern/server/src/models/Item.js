import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    done:        { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
