import { FormAction } from 'redux-form';
import { resultCodeEnum } from '../api/api';
import { userMainAPI } from '../api/main-api';
import { profileAPI } from '../api/profile-api';
import { FormValuesType } from '../pages/Settings/MyProfileDataEdit';
import { PhotosType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-state.js';


let initialState = {
	status: "",
	profile: null as ProfileType | null
}


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SET-STATUS':
			return {
				...state,
				status: action.status
			};
		case 'MY-PROFILE':
			return {
				...state,
				profile: action.myData
			};
		case 'SET-MY-PHOTO':
			return {
				...state, profile: { ...state.profile, photos: action.photo } as ProfileType
			};
		default:
			return state;
	}
}

export const actions = {
	profileStatus: (status: string) => ({ type: 'SET-STATUS', status } as const),
	myProfile: (myData: ProfileType | null) => ({ type: 'MY-PROFILE', myData } as const),
	setMyPhoto: (photo: PhotosType | null) => ({ type: 'SET-MY-PHOTO', photo } as const)
}



export const getStatusThunk = (userId: number): ThunkType => {
	return async (dispatch) => {
		let data = await profileAPI.getStatus(userId);
		dispatch(actions.profileStatus(data));
	}
}

export const updateStatusThunk = (status: string): ThunkType => {
	return async (dispatch) => {
		let response = await profileAPI.updateStatus(status);
		if (response.resultCode === resultCodeEnum.Success) {
			dispatch(actions.profileStatus(status));
		}
	}
}
export const getMyProfile = (userId: number): ThunkType => {
	return async (dispatch) => {
		let data = await userMainAPI.getUserProfile(userId);
		dispatch(actions.myProfile(data));
	}
}

export const savePhoto = (file: File): ThunkType => {
	return async (dispatch) => {
		let data = await profileAPI.putPhoto(file);
		if (data.resultCode === resultCodeEnum.Success) {
			dispatch(actions.setMyPhoto(data.data.photos));
		}
	}
}

export const saveProfileData = (profile: FormValuesType): ThunkType => {
	return async (dispatch: any, getState: any) => {
		const userId = 9725;
		let response = await profileAPI.updateProfile(profile);
		if (response.resultCode === resultCodeEnum.Success) {
			dispatch(getMyProfile(userId));
		}
	}
}
export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;


