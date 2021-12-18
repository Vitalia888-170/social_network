import { ProfileType } from '../types/types';
import { instance } from './api';

export const userMainAPI = {
   getUserProfile(userId: number | null) {
      return instance.get<ProfileType>('profile/' + userId).then(res => res.data)
   }
}