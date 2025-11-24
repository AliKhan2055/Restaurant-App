import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // Starters, Drinks, Main Course...
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", MenuItemSchema);
