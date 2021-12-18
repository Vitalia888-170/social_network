const users_Followed = 'FOLLOW';
const users_Unfollowed = 'UNFOLLOW';
import { Dispatch } from 'react';
import { FormAction } from 'redux-form';
import { resultCodeEnum } from '../api/api';
import { userAPI } from '../api/user-api';
import { FollowUnfollow } from '../common/FollowUnfollow/FollowUnfollow';
import { UserType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-state';


let initialState = {
	users: [] as Array<UserType>,
	totalCountPage: 0,
	pageSize: 20,
	currentPage: 1,
	isFetching: true,
	isAllowedFollow: [] as Array<number>,
	filter: {
		term: '',
		friend: null as boolean | null
	}
}


let usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'FOLLOW':
			return {
				...state,
				users: FollowUnfollow(state.users, "id", action.usersId, { followed: true })
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: FollowUnfollow(state.users, "id", action.usersId, { followed: false })
			}
		case 'SET-USERS':
			return {
				...state,
				users: action.users
			}
		case 'CURRENT-PAGE':
			return {
				...state,
				currentPage: action.pageNumber
			}
		case 'SET_FILTER':
			return {
				...state,
				filter: action.payload
			}
		case 'SET-TOTAL-COUNT-PAGES':
			return {
				...state,
				totalCountPage: action.pages
			}
		case 'SET-FEACHING':
			return {
				...state,
				isFetching: action.statusLoading
			}
		case 'FOLLOWING-IN-PROGRESS':
			return {
				...state,
				isAllowedFollow: action.changeFollow
					? [...state.isAllowedFollow, action.userId]
					: state.isAllowedFollow.filter(id => id != action.userId)
			}
		default:
			return state;
	}
}

export const actions = {
	followed: (usersId: number) => ({ type: 'FOLLOW', usersId } as const),
	unfollowed: (usersId: number) => ({ type: 'UNFOLLOW', usersId } as const),
	setUsers: (users: Array<UserType>) => ({ type: 'SET-USERS', users } as const),
	setCurrentPage: (pageNumber: number) => ({ type: 'CURRENT-PAGE', pageNumber } as const),
	setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
	setTotalCountPages: (pages: number) => ({ type: 'SET-TOTAL-COUNT-PAGES', pages } as const),
	setIsFetching: (statusLoading: boolean) => ({ type: 'SET-FEACHING', statusLoading } as const),
	setUserFollowingProgress: (changeFollow: boolean, userId: number) => ({ type: 'FOLLOWING-IN-PROGRESS', changeFollow, userId } as const)
}

export const getUsers = (pageNumber: number, pageSize: number, filter: FilterType, page: number): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.setIsFetching(true));
		dispatch(actions.setFilter(filter));
		let data = await userAPI.getUsers(pageNumber, pageSize, filter.term, filter.friend);
		dispatch(actions.setTotalCountPages(data.totalCount));
		dispatch(actions.setCurrentPage(page));
		dispatch(actions.setUsers(data.items));
		dispatch(actions.setIsFetching(false));
	}
}


export const changingFollow = async (chooseAction: any,
	setAction: (userId: number) => FollowedType | UnfollowedType,
	userId: number,
	dispatch: Dispatch<ActionsType>) => {
	dispatch(actions.setUserFollowingProgress(true, userId));
	let response = await chooseAction(userId);
	if (response.resultCode == resultCodeEnum.Success) {
		dispatch(setAction(userId));
	}
	dispatch(actions.setUserFollowingProgress(false, userId));
}

export const usersFollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		changingFollow(userAPI.follow.bind(userAPI), actions.followed, userId, dispatch);
	}
}

export const usersUnfollow = (userId: number): ThunkType => {
	return async (dispatch) => {
		changingFollow(userAPI.unfollow.bind(userAPI), actions.unfollowed, userId, dispatch);
	}
}


export default usersReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
export type FilterType = {
	term: string,
	friend: boolean | null
};
type ThunkType = BaseThunkType<ActionsType | FormAction>;
type FollowedType = {
	type: typeof users_Followed,
	usersId: number
}
type UnfollowedType = {
	type: typeof users_Unfollowed,
	usersId: number
}