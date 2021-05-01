import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    default: "Article title"
  },
  body: {
    type: String,
    default: "Article body"
  },
  image: String,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: String,
    default: "Article author"
  },
  featuredItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  sections: [
    {
      image: String,
      title: {
        type: String,
        default: "Section title"
      },
      body: {
        type: String,
        default: "Section body"
      },
    },
  ],
  videoLinks: {
    type: [String],
    default: []
  }
});

export default mongoose.models.Article ||
  mongoose.model("Article", articleSchema);
