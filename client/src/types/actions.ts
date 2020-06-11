import { UserActionTypes } from "./actions/UserActions";
import { ErrorActionTypes } from "./actions/ErrorActions";

export type AppActions = UserActionTypes | ErrorActionTypes; 