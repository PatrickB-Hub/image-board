import { Schema, Document, model } from "mongoose";

export type UserType = {
  _id: string;
  email: string;
  username: string;
  followers: String[];
  following: String[];
}
export interface UserDocument extends Document {
  email: string;
  username: string;
  hash: string;
  salt: string;
  followers: String[];
  following: String[];
  createdAt: Date;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  followers: [],
  following: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = model<UserDocument>("User", userSchema);

export default User;