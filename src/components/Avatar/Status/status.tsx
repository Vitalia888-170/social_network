import React, { useState, useEffect, ChangeEvent } from 'react';
//@ts-ignore
import styles from '../avatar.module.css';
type PropsType = {
	updateStatus: (status: string) => void,
	status: string
}

export const ProfileStatus: React.FC<PropsType> = (props) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(props.status);

	const activateStatus = () => {
		setEditMode(true);
	};

	const deactivateStatus = () => {
		setEditMode(false);
		props.updateStatus(status);
	};

	const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value);
	}

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	return (
		<div className={styles.status}>
			{ !editMode &&
				<div>
					<span onDoubleClick={activateStatus}>{props.status}</span>
				</div>
			}

			{editMode &&
				<div>
					<input onChange={changeStatus} autoFocus={true}
						onBlur={deactivateStatus} value={status} />
				</div>
			}

		</div>
	)
}
