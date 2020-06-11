import { Dispatch } from "redux";

import { User } from "../types/User";
import { GET_ERRORS } from "../types/actions/ErrorActions";
import { AppActions } from "../types/actions";

import useFetch, { headers, API_URL } from "../utils/useFetch";


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


export const loginUser = (userData: User) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/users/login", userData)
    .then(data => {
      if (data.success) {
        const { token } = data;
        localStorage.setItem("jwt", token);
        headers.append("Authorization", token);
      } else {
        dispatch({
          type: GET_ERRORS,
          errors: data.errors
        })
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        errors: err
      })
    });
}
