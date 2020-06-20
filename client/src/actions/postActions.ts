import { Dispatch } from "redux";

import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import {
  ADD_POST,
  GET_POSTS,
  LOADING_POSTS,
  UPDATE_POST,
  ADD_COMMENT
} from "../types/actions/PostActions";

import { AppActions } from "../types/actions";

import useFetch, { headers, API_URL } from "../utils/useFetch";

export const addPost = (postData: Post) => (dispatch: Dispatch<AppActions>) => {
  headers.delete("Content-Type");

  const { camera, location, description, files } = postData;

  if (camera && location && description && files) {
    let formData = new FormData();
    formData.append("camera", camera);
    formData.append("location", location);
    formData.append("description", description);
    formData.append('file', files[0]);

    useFetch("POST", API_URL + "/posts/add", formData, true)
      .then(data => {
        headers.set("Content-Type", "application/json");
        dispatch({
          type: ADD_POST,
          post: data.post
        });
      })
      .catch(err => {
        headers.set("Content-Type", "application/json");
        console.log(err);
      });
  }
}

export const getPosts = () => (dispatch: Dispatch<AppActions>) => {
  dispatch(loadingPosts());

  useFetch("GET", API_URL + "/posts")
    .then(data => dispatch({
      type: GET_POSTS,
      posts: data.posts
    }))
    .catch(err => console.log(err));
}

export const loadingPosts = (): AppActions => {
  return {
    type: LOADING_POSTS
  }
}

export const updatePostRating = (postData: { _id: string, rating: number }) => (dispatch: Dispatch<AppActions>) => {
  useFetch("PUT", API_URL + "/posts/rating", postData)
    .then(data => dispatch({
      type: UPDATE_POST,
      post: data.post
    }))
    .catch(err => console.log(err));
}

export const addComment = (commentData: Comment) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/posts/comment", commentData)
    .then(data => dispatch({
      type: ADD_COMMENT,
      comment: data.comment
    }))
    .catch(err => console.log(err));
}