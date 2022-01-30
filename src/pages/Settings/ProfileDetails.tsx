import React from 'react'
import { ProfileType } from '../../types/types';
import MyProfileDataEdit, { FormValuesType } from '../../pages/Settings/MyProfileDataEdit';
import { IconsGenerator } from '../../common/IconsGenerator/IconsGenerator';

type PropsType = {
	profile: ProfileType | null,
	saveProfileData: (profile: FormValuesType) => void
}
type StateType = {
	profile: ProfileType | null
}


class ProfileDetails extends React.Component<PropsType, StateType> {
	constructor(props: PropsType & StateType) {
		super(props);
		this.state = {
			profile: {
				userId: 9725,
				photos: {
					small: '',
					large: ''
				},
				aboutMe: '',
				lookingForAJob: false,
				lookingForAJobDescription: '',
				fullName: '',
				contacts: {
					github: '',
					vk: '',
					facebook: '',
					instagram: '',
					twitter: '',
					website: '',
					youtube: '',
					mainLink: ''
				}
			}
		}
	}
	componentDidUpdate(prevProps: PropsType) {
		if (this.props.profile !== prevProps.profile) {
			this.setState({
				profile: this.props.profile
			});
		}
	}

	render() {
		return (
			<div className='user-profile-data-container'>
			<MyProfileDataEdit  initialValues={this.props.profile} saveProfileData={this.props.saveProfileData} />
			</div>
		)
	}

}

export default ProfileDetails;