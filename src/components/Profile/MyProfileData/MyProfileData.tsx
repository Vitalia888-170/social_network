import React, { ChangeEvent } from 'react';
import { ProfileType } from '../../../types/types';
import { LineTitle } from '../../Avatar/Avatar';
import MyProfileDataEdit, { FormValuesType } from './MyProfileDataEdit';
import { IconsGenerator } from '../../../common/IconsGenerator/IconsGenerator';

type PropsType = {
	profile: ProfileType | null,
	saveProfileData: (profile: FormValuesType) => void
}
type StateType = {
	profile: ProfileType | null
	editMode: boolean
}


class MyProfileData extends React.Component<PropsType, StateType> {
	constructor(props: PropsType & StateType) {
		super(props);
		this.state = {
			profile: {
				userId: 0,
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
			},
			editMode: false
		}
	}
	activateProfileData = () => {
		this.setState({
			editMode: true
		});
	};

	deActivateProfileData = () => {
		this.setState({
			editMode: false
		});
	};
	handleSave = () => {
		this.deActivateProfileData();
	}
	componentDidUpdate(prevProps: PropsType) {
		if (this.props.profile !== prevProps.profile) {
			this.setState({
				//@ts-ignore
				profile: this.props.profile
			});
		}
	}

	render() {
		//@ts-ignore
		const { lookingForAJob, contacts, aboutMe, lookingForAJobDescription } = this.state.profile;
		return (
			<div className='user-profile-data-container'>
				{
					this.state.editMode
						? <MyProfileDataEdit handleSave={this.handleSave} initialValues={this.props.profile} saveProfileData={this.props.saveProfileData} />
						: <>
							<div className="data-list">
								<div className='data-item'>
									<LineTitle>About me</LineTitle>
									<p> {aboutMe}</p>
								</div>
								<div className='data-item'>
									<LineTitle>Looking for a job</LineTitle>
									<p> {lookingForAJob ? 'yes' : 'no'}</p>
								</div>
								<div className='data-item'>
									<LineTitle>Job description</LineTitle>
									<p> {lookingForAJobDescription}</p>
								</div>
							</div>
							<div className="data-details">
								<LineTitle>Contacts</LineTitle>
								<div className="details-content">
									{
										Object.entries(contacts).map(([title, src], index) => {
											console.log(title);
											return <a key={index} href={`${src}`}>
												{IconsGenerator(title)}
											</a>
										})
									}
								</div>
							</div>
							<button className='profile-button' onClick={this.activateProfileData}>Edit</button>
						</>

				}

			</div>
		)
	}

}

export default MyProfileData;


