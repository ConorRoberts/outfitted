import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: String,
  brand: String,
  description: String,
  season: String,
  category: String,
  occasion: String,
  colours: [String],
  material: String,
  price: Number,
  images: [String],
  sizes: [String],
  link: String,
  build: [String],
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
