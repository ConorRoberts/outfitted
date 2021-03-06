import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  birthday: {
    type: Date,
    default: Date.now(),
  },
  build: {
    type: String,
    default: "Other",
  },
  height: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    default: []
  },
  gender: {
    type: String,
    default: "Other",
  },
  fit: {
    type: String,
    default: "Other",
  },
  favBrands: {
    type: [String],
    default: [],
  },
  favColours: {
    type: [String],
    default: [],
  },
  favInfluencers: {
    type: [String],
    default: [],
  },
  sustainable: {
    type: String,
    default: "Other",
  },
  pantsSize: {
    type: String,
    default: "M",
  },
  shirtSize: {
    type: String,
    default: "M",
  },
  shoeSize: {
    type: Number,
    default: 0,
  },
  styleIcons: {
    type: [String],
    default: [],
  },
  sweaterSize: {
    type: String,
    default: "M",
  },
  recommendations: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
      timeRecommended: {
        type: Date,
        default: Date.now()
      },
      timeLive: {
        type: Date,
        default: Date.now()
      },
      body: {
        type: String,
        default: "Recommendation body"
      },
      hasPurchased: {
        type: Boolean,
        default: false
      }
    }
  ],
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
