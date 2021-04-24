import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    default: "Item Name"
  },
  brand: {
    type: String,
    default: "Item Brand"
  },
  description: {
    type: String,
    default: "Item Description"
  },
  seasons: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: "Item Category"
  },
  occasions: {
    type: [String],
    default: [],
  },
  colours: [String],
  material: String,
  price: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: [],
  },
  sizes: {
    type: [String],
    default: [],
  },
  link: {
    type: String,
    // This is a picture of Harambe
    default: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/GJJTWMF57A2LPPXE74CGWDDQ3E.jpg&w=1440"
  },
  builds: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
