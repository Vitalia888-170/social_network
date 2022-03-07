import { FormAction } from 'redux-form';
import { userMainAPI } from '../api/main-api';
import { ProfileType} from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-state';


let initialState = {
	profile: null as ProfileType | null,
}


let userProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'TOTAL-USER-PROFILE':
			return {
				...state,
				profile: action.profile
			}
		default:
			return state;
	}
}

export const actions = {
	userProfile: (profile: ProfileType) => ({ type: 'TOTAL-USER-PROFILE', profile } as const),
}

export const getUserProfile = (userId: number): ThunkType => {
	return async (dispatch: any) => {
		let data = await userMainAPI.getUserProfile(userId);
		dispatch(actions.userProfile(data));
	}
}

export default userProfileReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>