import { User } from "../User";

export const GET_PROFILE = "GET_PROFILE";
export const LOADING_PROFILE = "LOADING_PROFILE";
export const FOLLOW_PROFILE = "FOLLOW_PROFILE";
export const UNFOLLOW_PROFILE = "UNFOLLOW_PROFILE";

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  user: User;
}

export interface LoadingProfileAction {
  type: typeof LOADING_PROFILE;
}

export interface FollowProfileAction {
  type: typeof FOLLOW_PROFILE;
  id: string;
}

export interface UnfollowProfileAction {
  type: typeof UNFOLLOW_PROFILE;
  id: string;
}

export type ProfileActionTypes = GetProfileAction | LoadingProfileAction | FollowProfileAction | UnfollowProfileAction;
