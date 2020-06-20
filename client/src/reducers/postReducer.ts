import { Post } from "../types/Post";
import {
  PostActionTypes,
  ADD_POST,
  GET_POSTS,
  LOADING_POSTS,
  UPDATE_POST,
  ADD_COMMENT
} from "../types/actions/PostActions";

interface PostState {
  posts: Post[],
  loading: boolean
}

const postReducerDefaultState: PostState = {
  posts: [],
  loading: false
}

const postReducer = (
  state = postReducerDefaultState,
  action: PostActionTypes
): PostState => {
  switch (action.type) {

    case ADD_POST:
      return {
        posts: [action.post, ...state.posts],
        loading: false
      };

    case GET_POSTS:
      return {
        posts: action.posts,
        loading: false,
      };

    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.post._id)
            return action.post;
          else
            return post;
        }),
      };

    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === action.comment.postId) {
            const comments = post.comments || [];
            return { ...post, comments: [...comments, action.comment] };
          } else
            return post;
        }),
      };

    default:
      return state;
  }
}


export { postReducer };