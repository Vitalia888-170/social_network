import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader';
import { PhotosType } from '../../types/types';
import { ProfileStatus } from './Status/status';
import { getLogin, getProfile, getStatus } from '../../selectors/selectors';
//@ts-ignore
import styles from './avatar.module.css';
import { savePhoto, updateStatusThunk } from '../../redux/profile-reducer';
import { MdAddAPhoto } from "react-icons/md";
import { FollowBlocks } from './FollowBlocks/FollowBlocks';

type PropsType = {
	photos: PhotosType | null | undefined
}

export const LineTitle: React.FC = (props) => {
	return (
		<div className={styles.lineTitle}>
			<div className={styles.line}></div>
			<span>{props.children}</span>
		</div>
	)
}
export const AvatarMainInform: React.FC<PropsType> = (props) => {
	const status = useSelector(getStatus);
	const profile = useSelector(getProfile);
	const dispatch = useDispatch();

	const updateStatus = (status: string) => {
		dispatch(updateStatusThunk(status));
	}
	const onUploadPhoto = (e: any) => {
		if (e.target.files.length) {
			dispatch(savePhoto(e.target.files[0]));
		}
	}

	return (
		<div className={styles.avatarContainer}>
			<div className={styles.avatarBg}>
				{
					props.photos
						? <img className={styles.avatarPhoto} src={props.photos.large} />
						: <Preloader isFetching={true} />
				}
				<div className={styles.avatarAddFile}>
					<MdAddAPhoto className={styles.uploadImage} />
					<input className={styles.input} type={"file"} onChange={onUploadPhoto} />
				</div>
			</div>
			<h5>{profile ? profile.fullName : null}</h5>
			<LineTitle>Status</LineTitle>
			<ProfileStatus status={status} updateStatus={updateStatus} />
			<FollowBlocks />
		</div>
	)
}
