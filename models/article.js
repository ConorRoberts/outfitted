import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  title: String,
  body: String,
  image:String,
  timestamp:Date,
  author:String,
  sections: [
    {
      image: String,
      title: String,
      body: String,
    },
  ],
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
