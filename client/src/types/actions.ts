import { UserActionTypes } from "./actions/UserActions";
import { PostActionTypes } from "./actions/PostActions";
import { ErrorActionTypes } from "./actions/ErrorActions";

export type AppActions = UserActionTypes | PostActionTypes | ErrorActionTypes; 