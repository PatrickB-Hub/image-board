import { User } from "./User";
import { Rating } from "./Rating";
import { Comment } from "./Comment";

export interface Post {
  _id?: string,
  user?: User,
  camera?: string,
  location?: string,
  description?: string,
  filePath?: string,
  files?: File[],
  rating?: Rating,
  comments?: Comment[],
  createdAt?: Date
}