import React from 'react'
//@ts-ignore
import Avatar from './../../common/avatar.png';
import { ProfileType } from '../../types/types';


type PropsType = {
   profile: ProfileType | null
}
const UserProfile: React.FC<PropsType> = (props) => {
   //@ts-ignore
   const { lookingForAJob, aboutMe, lookingForAJobDescription, fullName, contacts, photos } = props.profile;

   return (
      <div className="user-profile-container">
         <h4>User profile</h4>
         <div className="user-profile-content">
            <img src={photos.large ? photos.large : Avatar} alt="avatar" />
            <div className="user-profile-details">
               <h3> {fullName}</h3><br />
               <b>About me:</b> <span>{aboutMe}</span><br />
               <b>Looking for a job:</b><span> {lookingForAJob ? "yes" : "no"}</span><br />
               <b>Job description:</b><span> {lookingForAJobDescription}</span><br />
               <b>Github:</b> <span>{contacts.github}</span><br />
               <b>Vk:</b> <span>{contacts.vk}</span><br />
               <b>Facebook:</b> <span>{contacts.facebook}</span><br />
               <b>Instagram:</b> <span>{contacts.instagram}</span><br />
               <b>Twitter:</b> <span>{contacts.twitter}</span><br />
               <b>Website:</b> <span>{contacts.website}</span><br />
               <b>Youtube:</b> <span>{contacts.youtube}</span><br />
               <b>Main link:</b> <span>{contacts.youtube}</span>
            </div>
         </div>
      </div>
   )
}

export default UserProfile;
