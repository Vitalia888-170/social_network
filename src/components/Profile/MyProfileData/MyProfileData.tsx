import React, { ChangeEvent } from 'react';
import { ProfileType } from '../../../types/types';
import { LineTitle } from '../../Avatar/Avatar';
import  { FormValuesType } from '../../../pages/Settings/MyProfileDataEdit';
import { IconsGenerator } from '../../../common/IconsGenerator/IconsGenerator';

type PropsType = {
	profile: ProfileType | null
}
type StateType = {
	profile: ProfileType | null
}


class MyProfileData extends React.Component<PropsType, StateType> {
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
		//@ts-ignore
		const { lookingForAJob, contacts, aboutMe, lookingForAJobDescription } = this.state.profile;
		return (
			<div className='user-profile-data-container'>
				<>
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
											return <a key={index} href={`${src}`}>
												{IconsGenerator(title)}
											</a>
										})
									}
								</div>
							</div>
						</>
			</div>
		)
	}

}

export default MyProfileData;


