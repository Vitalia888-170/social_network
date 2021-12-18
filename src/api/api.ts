import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "cca41e4e-7b4b-400f-969b-47fe9e0a985e"
	}
});

export enum resultCodeEnum {
	Success = 0,
	Error = 1
}

export enum resultCodeCaptchaEnum {
	CaptchaIsRequired = 10
}

export type GetItemsType = {
	items: Array<UserType>,
	totalCount: number,
	error: null | string
}

export type ResponseType<T = {}, RC = resultCodeEnum> = {
	data: T,
	resultCode: RC,
	messages: Array<string>
}


