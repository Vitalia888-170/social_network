import { instance } from './api';
type CaptchaDataType = {
   url: string
}

export const captchaAPI = {
   getCaptcha() {
      return instance.get<CaptchaDataType>('security/get-captcha-url').then(res => res.data);
   }
}