import { AxiosPromise } from 'axios';
import { UserType } from '../types/types';
import { instance, ResponseType } from './api';

export type UserResponseType = {
   items: Array<UserType>,
   Items: UserType,
   totalCount: number,
   error: string | null
}

export const userAPI = {
   getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
      return instance.get<UserResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
         .then(response => {
            return response.data
         })
   },
   follow(userId: number) {
      return instance.post<ResponseType>(`follow/${userId}`)
   },
   unfollow(userId: number) {
      return instance.delete(`follow/${userId}`) as AxiosPromise<ResponseType>
   }
}