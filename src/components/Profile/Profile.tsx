import React, { useEffect, useState } from 'react';
import '../../App.css';
//@ts-ignore
import { AvatarMainInform } from '../Avatar/Avatar';
import MyProfileData from './MyProfileData/MyProfileData';
import { FormValuesType } from './MyProfileData/MyProfileDataEdit';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../selectors/selectors';
import { getStatusThunk, getMyProfile, saveProfileData } from '../../redux/profile-reducer';


const Profile: React.FC = () => {
	const [isViewDetails, setIsViewDetails] = useState(false);
	const profile = useSelector(getProfile);
	const dispatch = useDispatch();
	const updateProfile = () => {
		let userId = 9725;
		dispatch(getStatusThunk(userId));
		dispatch(getMyProfile(userId));

	}

	useEffect(() => {
		updateProfile();
	}, []);
	const saveProfile = (profile: FormValuesType) => {
		dispatch(saveProfileData(profile))
	}

	return (
		<div className="profile-container">
			<AvatarMainInform
				photos={profile ? profile.photos : null}
			/>
			<p className="link" onClick={() => setIsViewDetails(!isViewDetails)}>View details</p>
			{
				isViewDetails
					? <div className="profile-userInform">
						<MyProfileData profile={profile} saveProfileData={saveProfile} />
					</div>
					: null
			}
		</div>

	);
}

export default Profile;