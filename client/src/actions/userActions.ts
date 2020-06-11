import { Dispatch } from "redux";

import { User } from "../types/User";
import { GET_ERRORS } from "../types/actions/ErrorActions";
import { AppActions } from "../types/actions";

import useFetch, { API_URL } from "../utils/useFetch";


export const registerUser = (userData: User, history: any) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/users/register", userData)
    .then(data => {
      if (data.success) {
        history.push("/image-board/login");
      } else {
        dispatch({
          type: GET_ERRORS,
          errors: data.errors
        });
      }
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      errors: err
    }));
}
