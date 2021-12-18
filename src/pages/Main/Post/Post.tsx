import React from 'react';
import '../../../App.css';

type PropsType = {
	key: number,
	message: string
}
const Post: React.FC<PropsType> = (props) => {

	return (
		<div className="post">
			<img className="log" src='https://www.spotteron.net/images/icons/user60.png' alt='logo' />
			<span>{props.message}</span>
		</div>
	);
}

export default Post;