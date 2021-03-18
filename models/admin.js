import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
  _user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
