import { Schema, Document, model } from "mongoose";

type Rating = {
  overallRating: number,
  totalRating: number,
  individualRatings: Array<{ userId: string, rating: number }>
}
export interface PostDocument extends Document {
  camera: String;
  location: String;
  description: String;
  filePath: String;
  user: Object;
  rating: Rating;
  comments: Array<Object>;
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
  rating: {
    type: Object,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Post = model<PostDocument>("Post", PostSchema);
export default Post;

