import { AppStateType } from '../redux/redux-state';

export const getTotalCountPage = (state: AppStateType) => {
	return state.usersPage.totalCountPage
}

export const getTotalUsers = (state: AppStateType) => {
	return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
	return state.usersPage.pageSize
}

export const getCurrentPage = (state: AppStateType) => {
	return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
	return state.usersPage.isFetching
}
export const getUserFilter = (state: AppStateType) => {
	return state.usersPage.filter
}

export const getIsAllowedFollow = (state: AppStateType) => {
	return state.usersPage.isAllowedFollow
}
export const getFilter = (state: AppStateType) => {
	return state.usersPage.filter
}
export const getDialogs = (state: AppStateType) => {
	return state.dialogsPage
}
export const getIsAuth = (state: AppStateType) => {
	return state.auth.isAuth
}
export const getLogin = (state: AppStateType) => {
	return state.auth.login
}
export const getCaptchaUrl = (state: AppStateType) => {
	return state.auth.url
}
export const getPosts = (state: AppStateType) => {
	return state.mainPage.posts
}
export const getStatus = (state: AppStateType) => {
	return state.profile.status
}
export const getUserAuthorized = (state: AppStateType) => {
	return state.auth.userId
}

export const getProfile = (state: AppStateType) => {
	return state.profile.profile
}

export const getCurrentUserProfile = (state: AppStateType) => {
	return state.mainPage.profile
}
export const getAuth = (state: AppStateType) => {
	return state.auth.isAuth
}

export const getMessages = (state: AppStateType) => {
	return state.chat.messages
}

export const getConnectStatus = (state: AppStateType) => {
	return state.chat.connectingStatus
}


