import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  height: {
    type: Number,
    default: 0,
  },
  build: {
    type: String,
    default: "Other",
  },
  birthday: {
    type: Date,
    default: Date.now(),
  },
  gender: {
    type: String,
    default: "Other",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
