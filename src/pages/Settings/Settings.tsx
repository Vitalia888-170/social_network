import React from 'react'
import { FormValuesType } from './MyProfileDataEdit';
import { getStatusThunk, getMyProfile, saveProfileData } from '../../redux/profile-reducer';
import { getProfile } from '../../selectors/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ProfileDetails from './ProfileDetails';
const Settings=()=> {
   const profile = useSelector(getProfile);
	const dispatch = useDispatch();
   const saveProfile = (profile: FormValuesType) => {
		dispatch(saveProfileData(profile))
	}
   return (
      <div>
         <ProfileDetails profile={profile} saveProfileData={saveProfile} />
      </div>
   )
}

export default Settings
