import { Dispatch } from "redux";

import {
  GET_PROFILE,
  LOADING_PROFILE,
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE
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

export const searchProfile = (text: string, history: any) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/users/search", { text })
    .then(data => {
      if (data.success)
        history.push(`/image-board/profile/${data.userId}`);
      else
        history.push("/image-board/search");
    })
    .catch(_err => history.push("/image-board/search"));
}

export const loadingProfile = (): AppActions => {
  return {
    type: LOADING_PROFILE
  };
}

export const followProfile = (profileId: string) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/users/follow", { profileId })
    .then(data => dispatch({
      type: FOLLOW_PROFILE,
      id: data.userId
    }))
    .catch(err => console.log(err));
}

export const unfollowProfile = (profileId: string) => (dispatch: Dispatch<AppActions>) => {
  useFetch("POST", API_URL + "/users/unfollow", { profileId })
    .then(data => dispatch({
      type: UNFOLLOW_PROFILE,
      id: data.userId
    }))
    .catch(err => console.log(err));
}
