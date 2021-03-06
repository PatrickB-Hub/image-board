import { Dispatch } from "redux";

import { Post } from "../types/Post";
import { Comment } from "../types/Comment";
import {
  ADD_POST,
  GET_POSTS,
  LOADING_POSTS,
  UPDATE_POST,
  ADD_COMMENT,
  DELETE_POST
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

export const getPosts = (userId?: string) => (dispatch: Dispatch<AppActions>) => {
  dispatch(loadingPosts());

  const url = API_URL.concat("/posts", userId ? `/${userId}` : "");

  useFetch("GET", url)
    .then(data => dispatch({
      type: GET_POSTS,
      posts: data.posts
    }))
    .catch(err => console.log(err));
}

export const getPostsByFollowedUsers = () => (dispatch: Dispatch<AppActions>) => {
  useFetch("GET", API_URL + "/posts/following")
    .then(data => dispatch({
      type: GET_POSTS,
      posts: data.posts
    }))
    .catch(err => console.log(err));
}

export const deletePost = (postId: string) => (dispatch: Dispatch<AppActions>) => {
  useFetch("DELETE", API_URL + "/posts/delete", { postId })
    .then(data => dispatch({
      type: DELETE_POST,
      id: data.post._id
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