import { Post } from "../Post";

export const ADD_POST = "ADD_POST";

export interface AddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

export type PostActionTypes = AddPostAction;