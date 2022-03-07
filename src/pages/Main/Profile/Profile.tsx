import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from '../main.module.css';
//@ts-ignore
import { AvatarMainInform } from '../../../components/Avatar/Avatar';
import MyProfileData from './MyProfileData/MyProfileData';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../../selectors/selectors';
import { getStatusThunk, getMyProfile} from '../../../redux/profile-reducer';


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
		console.log('set')
		updateProfile();
	}, []);

	return (
		<div className={styles.container}>
			<AvatarMainInform
				photos={profile ? profile.photos : null}
			/>
				<div className={styles.userInform}>
						<MyProfileData profile={profile}/>
					</div>
		</div>

	);
}

export default Profile;