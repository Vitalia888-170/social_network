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
               {aboutMe && <p><b>About me:</b> <span>{aboutMe}</span></p>}
               {lookingForAJob && <p><b>Looking for a job:</b><span> {lookingForAJob ? "yes" : "no"}</span></p>}
               {lookingForAJobDescription && <p><b>Job description:</b><span> {lookingForAJobDescription}</span></p>}
              {contacts.github && <p> <b>Github:</b> <a href={contacts.github}>{contacts.github}</a></p>}
              {contacts.vk && <p> <b>Vk:</b> <a href={contacts.vk}>{contacts.vk}</a></p>}
              {contacts.facebook && <p> <b>Facebook::</b> <a href={contacts.facebook}>{contacts.facebook}</a></p>}
              {contacts.instagram && <p> <b>Instagram:</b> <a href={contacts.instagram}>{contacts.instagram}</a></p>}
              {contacts.twitter && <p> <b>Twitter:</b> <a href={contacts.twitter}>{contacts.twitter}</a></p>}
              {contacts.website && <p> <b>Website:</b> <a href={contacts.website}>{contacts.website}</a></p>}
              {contacts.youtube && <p> <b>Youtube:</b> <a href={contacts.youtube}>{contacts.youtube}</a></p>}
            </div>
         </div>
      </div>
   )
}

export default UserProfile;
