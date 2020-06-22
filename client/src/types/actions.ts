import { UserActionTypes } from "./actions/UserActions";
import { PostActionTypes } from "./actions/PostActions";
import { ErrorActionTypes } from "./actions/ErrorActions";
import { ProfileActionTypes } from "./actions/ProfileActions";

export type AppActions = UserActionTypes | PostActionTypes | ErrorActionTypes | ProfileActionTypes; 