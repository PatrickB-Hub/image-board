import { Schema, Document, model } from "mongoose";

export interface PostDocument extends Document {
  camera: String;
  location: String;
  description: String;
  filePath: String;
  user: Object;
  createdAt: Date;
}

const PostSchema = new Schema({
  camera: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Post = model<PostDocument>("Post", PostSchema);
export default Post;
