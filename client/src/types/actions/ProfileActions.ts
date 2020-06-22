import { User } from "../User";

export const GET_PROFILE = "GET_PROFILE";
export const LOADING_PROFILE = "LOADING_PROFILE";

export interface GetProfileAction {
    type: typeof GET_PROFILE;
    user: User;
}

export interface LoadingProfileAction {
    type: typeof LOADING_PROFILE;
}

export type ProfileActionTypes = GetProfileAction | LoadingProfileAction;
