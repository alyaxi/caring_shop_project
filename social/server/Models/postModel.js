import mongoose from "mongoose";

const comment = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  comment: String,
});

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    profile: { type: String, required: true },
    desc: { type: String, required: true },
    comments: [comment],
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: String,
  },
  {
    timestamps: true,
  }
);
var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
