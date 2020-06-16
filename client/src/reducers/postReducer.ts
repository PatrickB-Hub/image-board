import { Post } from "../types/Post";
import {
  PostActionTypes,
  ADD_POST
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

    default:
      return state;
  }
}


export { postReducer };