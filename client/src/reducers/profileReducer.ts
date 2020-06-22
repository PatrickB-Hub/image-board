import { User } from "../types/User";
import {
  ProfileActionTypes,
  GET_PROFILE,
  LOADING_PROFILE
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

    default:
      return state;
  }
};

export { profileReducer };