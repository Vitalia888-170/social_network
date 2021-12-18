import { FormValuesType } from '../components/Profile/MyProfileData/MyProfileDataEdit';
import { PhotosType, ProfileType } from '../types/types';
import { instance, ResponseType } from './api';
type PutPhotoType = {
   photos: PhotosType
}

export const profileAPI = {
   getStatus(userId: number) {
      return instance.get<string>('profile/status/' + userId).then(res => res.data)
   },
   getFriendsCount() {
      return instance.get('users?page=1&count=20&term=&friend=true').then(res => res.data);
   },
   updateStatus(status: string) {
      return instance.put<ResponseType>('profile/status', { status: status }).then(res => res.data);
   },
   putPhoto(photoFile: File) {
      const formData = new FormData();
      formData.append("image", photoFile);
      return instance.put<ResponseType<PutPhotoType>>(`profile/photo`, formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(res => res.data);
   },
   updateProfile(profile: FormValuesType) {
      return instance.put<ResponseType>('/profile', profile).then(res => res.data);
   }

}