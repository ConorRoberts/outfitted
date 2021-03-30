import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: String,
  brand: String,
  description: String,
  seasons: [String],
  category: String,
  occasions: [String],
  colours: [String],
  material: String,
  price: Number,
  images: [String],
  sizes: [String],
  link: String,
  builds: [String],
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
