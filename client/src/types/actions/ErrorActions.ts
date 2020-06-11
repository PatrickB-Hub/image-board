import { Errors } from "../Error";

export const GET_ERRORS = "GET_ERRORS";
export interface GetErrorAction {
  type: typeof GET_ERRORS;
  errors: Errors;
}

export type ErrorActionTypes = GetErrorAction;