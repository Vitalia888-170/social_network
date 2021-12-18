import { AxiosPromise } from 'axios';
import { instance, ResponseType, resultCodeCaptchaEnum, resultCodeEnum } from './api';

type authResponseDataType = {
   id: number,
   email: string,
   login: string
}
type LoginResponseDataType = {
   userId: number
}

export const authAPI = {
   auth() {
      return instance.get<ResponseType<authResponseDataType>>('auth/me').then(res => res.data)
   },
   login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
      return instance.post<ResponseType<LoginResponseDataType, resultCodeEnum | resultCodeCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha })
         .then(res => res.data)
   },
   logout() {
      return instance.delete('auth/login') as AxiosPromise<ResponseType>;
   }
}