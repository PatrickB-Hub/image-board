import { Dispatch } from "redux";

import { User } from "../types/User";
import { SET_USER } from "../types/actions/UserActions";
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
        // store jwt in local storage
        const { token, expiresIn } = data;
        localStorage.setItem("jwt", JSON.stringify({ token, expiresIn }));

        // set current user
        headers.append("Authorization", token);
        useFetch("GET", API_URL + "/users")
          .then(res => dispatch({
            type: SET_USER,
            user: res.user
          }));
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

export const logoutUser = () => (dispatch: Dispatch<AppActions>) => {
  localStorage.removeItem("jwt");
  headers.delete("Authorization");
  dispatch({
    type: SET_USER,
    user: {}
  });
  window.location.href = "/image-board/";
}

export const setUser = () => (dispatch: Dispatch<AppActions>) => {
  useFetch("GET", API_URL + "/users")
    .then(data => {
      if (data.success)
        dispatch({
          type: SET_USER,
          user: data.user
        })
    })
}
