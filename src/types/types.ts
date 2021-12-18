export type ContactsType = {
   github: string | null,
   vk: string | null,
   facebook: string | null,
   instagram: string | null,
   twitter: string | null,
   website: string | null,
   youtube: string | null,
   mainLink: string | null
}

export type PhotosType = {
   small: string,
   large: string
}
export type ProfileType = {
   userId: number | null,
   aboutMe: string | null,
   lookingForAJob: boolean,
   lookingForAJobDescription: string | null,
   fullName: string | null,
   contacts: ContactsType,
   photos: PhotosType | null | undefined
}
export type UserType = {
   id: number,
   name: string,
   status: string,
   photos: PhotosType,
   followed: boolean
}



export type DialogsType = {
   id: string,
   name: string
}
export type MessagesType = {
   id: number,
   message: string
}