import React from 'react';
import '../../../App.css';

type PropsType = {
	message: string
}
const MessageItem: React.FC<PropsType> = (props) => {
	return (
		<div className="letter">
			<img src='https://www.spotteron.net/images/icons/user60.png' alt='user' />
			<div className="text">{props.message}</div>
		</div>
	);
}



export default MessageItem;