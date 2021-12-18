import { resultCodeCaptchaEnum, resultCodeEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { captchaAPI } from '../api/captcha-api';
import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType } from './redux-state';
import { InferActionsTypes } from './redux-state';

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	password: null as string | null,
	rememberMe: null as boolean | null,
	isAuth: false as boolean,
	url: null as string | null
}

let authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SET_USER_AUTH':
			return {
				...state,
				...action.data
			};
		case 'SET_CAPTCHA_URL':
			return {
				...state,
				url: action.captchaUrl
			}
		default:
			return state
	}
}
export const actions = {
	setUserLogged: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
		type: 'SET_USER_AUTH', data: { userId, email, login, isAuth }
	} as const),
	setCaptchaUrl: (captchaUrl: string) => ({ type: 'SET_CAPTCHA_URL', captchaUrl } as const),
}

export const getUserLogin = (): ThunkType => {
	return async (dispatch) => {
		let meData = await authAPI.auth();
		if (meData.resultCode === resultCodeEnum.Success) {
			let { id, email, login } = meData.data;
			await dispatch(actions.setUserLogged(id, email, login, true));
			localStorage.setItem('isAuth', 'yes');
		}
	}
}

export const Login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
	return async (dispatch) => {
		let data = await authAPI.login(email, password, rememberMe, captcha);
		if (data.resultCode === resultCodeEnum.Success) {
			dispatch(getUserLogin());
		} else {
			if (data.resultCode === resultCodeCaptchaEnum.CaptchaIsRequired) {
				dispatch(getCaptchaUrlThunk());
			}
			let message = data.messages.length > 0 ? data.messages[0] : "Some error";
			//@ts-ignore
			dispatch(stopSubmit('login', { _error: message }));
		}
	}
}

export const Logout = (): ThunkType => {
	return async (dispatch) => {
		let response = await authAPI.logout();
		if (response.data.resultCode === resultCodeEnum.Success) {
			await dispatch(actions.setUserLogged(null, null, null, false));
			localStorage.setItem('isAuth', 'no');
		}
	}
}

export const getCaptchaUrlThunk = (): ThunkType => {
	return async (dispatch) => {
		const data = await captchaAPI.getCaptcha();
		const captchaUrl = data.url;
		dispatch(actions.setCaptchaUrl(captchaUrl));
	}
}
export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>