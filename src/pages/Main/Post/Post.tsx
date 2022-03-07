import React from 'react';
//@ts-ignore
import styles from '../main.module.css'

type PropsType = {
	key: number,
	message: string
}
const Post: React.FC<PropsType> = (props) => {

	return (
		<div className={styles.post}>
			<img className={styles.log} src='https://www.spotteron.net/images/icons/user60.png' alt='logo' />
			<span>{props.message}</span>
		</div>
	);
}

export default Post;