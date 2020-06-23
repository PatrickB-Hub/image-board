import { User } from "../types/User";
import {
  ProfileActionTypes,
  GET_PROFILE,
  LOADING_PROFILE,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from "../types/actions/ProfileActions";

interface ProfileState {
  user: User,
  loading: boolean
}

const profileReducerDefaultState: ProfileState = {
  user: {},
  loading: false
};

const profileReducer = (
  state = profileReducerDefaultState,
  action: ProfileActionTypes
): ProfileState => {

  switch (action.type) {
    case GET_PROFILE:
      return {
        user: action.user,
        loading: false
      };

    case LOADING_PROFILE:
      return {
        ...state,
        loading: true
      };

    case FOLLOW_PROFILE:
      const followers = state.user.followers || [];
      return {
        ...state,
        user: {
          ...state.user,
          followers: [...followers, action.id]
        },
      };

    case UNFOLLOW_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers ? state.user.followers.filter((userId: string) => userId !== action.id) : []
        }
      };

    default:
      return state;
  }
};

export { profileReducer };