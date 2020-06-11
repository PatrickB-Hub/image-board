import { Errors } from "../types/Error";
import {
  ErrorActionTypes,
  GET_ERRORS,
} from "../types/actions/ErrorActions";

const errorReducerDefaultState: Errors = {};

const errorReducer = (state = errorReducerDefaultState, action: ErrorActionTypes): Errors => {
  switch (action.type) {
    case GET_ERRORS:
      return action.errors
    default:
      return state;
  }
}

export { errorReducer };