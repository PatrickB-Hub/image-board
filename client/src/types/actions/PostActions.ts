import { Post } from "../Post";

export const ADD_POST = "ADD_POST";
export const GET_POSTS = "GET_POSTS";
export const LOADING_POSTS = "LOADING_POSTS";

export interface AddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

export interface GetPostAction {
  type: typeof GET_POSTS;
  posts: Post[];
}

export interface LoadingPostAction {
  type: typeof LOADING_POSTS;
}
export type PostActionTypes = AddPostAction | GetPostAction | LoadingPostAction;