import { combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk, { ThunkMiddleware } from "redux-thunk";

import { errorReducer } from "../reducers/errorReducer";
import { userReducer } from "../reducers/userReducer";
import { postReducer } from "../reducers/postReducer";
import { AppActions } from "../types/actions";

export const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer,
  post: postReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);