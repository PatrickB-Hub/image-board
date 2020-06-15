import { User } from "../types/User";
import {
  UserActionTypes,
  SET_USER,
} from "../types/actions/UserActions";

interface UserState {
  user: User,
  isAuthenticated: boolean,
}

const userReducerDefaultState: UserState = {
  user: {},
  isAuthenticated: false
};

const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): UserState => {

  switch (action.type) {

    case SET_USER:
      return {
        isAuthenticated: true,
        user: action.user
      };

    default:
      return state;
  }
};

export { userReducer };