import { userMainAPI } from './../api/main-api';
import { ProfileType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-state';
import { FormAction } from 'redux-form';

type PostsType = {
	id: number,
	message: string
}

let initialState = {
	posts: [
		{ id: 1, message: 'Hey, how are you?' },
		{ id: 2, message: 'Penelope, where are you now? I miss you so much!!!' },
		{ id: 3, message: 'Did you finish last projects? Can you tell me how you did it so quickly?' },
		{ id: 4, message: 'Dear, I will wait for you and Melisa in my birthday party' }
	] as Array<PostsType>,
	profile: null as ProfileType | null
}

let mainReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {

		case 'ADD-POST':
			return {
				...state,
				posts: [{ id: 5, message: action.textPost }, ...state.posts]
			};
		case 'TOTAL-USER-PROFILE':
			return {
				...state,
				profile: action.profile
			};
		case 'DELETE-POST':
			return {
				...state, posts: state.posts.filter(p => p.id != action.userId)
			};
		default:
			return state;
	}
}

export const actions = {
	addPost: (textPost: string) => ({ type: 'ADD-POST', textPost } as const),
	deletePost: (userId: number) => ({ type: 'DELETE-POST', userId } as const),
	userProfile: (profile: ProfileType) => ({ type: 'TOTAL-USER-PROFILE', profile } as const)
}

export const getUserProfile = (userId: number): ThunkType => {
	return async (dispatch: any) => {
		let data = await userMainAPI.getUserProfile(userId);
		dispatch(actions.userProfile(data));
	}
}

export default mainReducer;


type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>