import { User } from "./User";

export interface Comment {
  postId?: string,
  user?: User,
  message?: string,
  createdAt?: Date
}
