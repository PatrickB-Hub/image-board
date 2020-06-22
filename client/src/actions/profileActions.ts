import { Dispatch } from "redux";

import {
  GET_PROFILE,
  LOADING_PROFILE
} from "../types/actions/ProfileActions";
import { AppActions } from "../types/actions";

import useFetch, { API_URL } from "../utils/useFetch";


export const getProfile = (userId: string, refresh?: boolean) => (dispatch: Dispatch<AppActions>) => {
  if (!refresh)
    dispatch(loadingProfile());

  useFetch("GET", API_URL + `/users/${userId}`)
    .then(data => dispatch({
      type: GET_PROFILE,
      user: data.user
    }))
    .catch(err => console.log(err));
}

export const loadingProfile = (): AppActions => {
  return {
    type: LOADING_PROFILE
  };
}
