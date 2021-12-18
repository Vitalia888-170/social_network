import React, { useEffect, useState } from 'react'
import { profileAPI } from '../../../api/profile-api';
//@ts-ignore
import styles from '../avatar.module.css';

export const FollowBlocks = () => {
   const [followedUser, setFollowedUser] = useState(0);

   const getFriends = async () => {
      let data = await profileAPI.getFriendsCount();
      setFollowedUser(data.totalCount);
   }
   useEffect(() => {
      getFriends();
   }, []);
   return (
      <div className={styles.followBlockContainer}>
         <div className={styles.followBlock}>
            <h5>Followers</h5>
            <p>0</p>
         </div>
         <div className={styles.followBlock}>
            <h5>Following</h5>
            <p>{followedUser}</p>
         </div>
      </div>
   )
}
