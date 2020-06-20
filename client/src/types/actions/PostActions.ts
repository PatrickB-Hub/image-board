import { Post } from "../Post";
import { Comment } from "../Comment";

export const ADD_POST = "ADD_POST";
export const GET_POSTS = "GET_POSTS";
export const LOADING_POSTS = "LOADING_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const ADD_COMMENT = "ADD_COMMENT";

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

export interface UpdatePostAction {
  type: typeof UPDATE_POST;
  post: Post;
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT;
  comment: Comment;
}

export type PostActionTypes = AddPostAction | GetPostAction | LoadingPostAction | UpdatePostAction | AddCommentAction;