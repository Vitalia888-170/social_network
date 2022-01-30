import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
//@ts-ignore
import Avatar from './avatar.jpg'
import { useDispatch } from 'react-redux';
import { setDialogsThunk } from '../../redux/dialogs-reducer';


type PropType = {
	user: UserType,
	isAllowedFollow: Array<number>,
	usersUnfollowed: (id: number) => void,
	usersFollowed: (id: number) => void
}


const User: React.FC<PropType> = ({ user, isAllowedFollow, usersUnfollowed, usersFollowed }) => {
	let dispatch=useDispatch();
const handleStartMessage=(userId:number)=>{
dispatch(setDialogsThunk(userId))
}
	return (
		<div className="user-items" key={user.id}>
			<div className="user-bg"></div>
			<div className="user-profile">
				<img className="user-photo" src={user.photos.large != null ? user.photos.large : Avatar} />
			</div>
			<div className="user-inform">
				<h2>{user.name}</h2>
				<div className="user-btn">
					<div className="message-btn">
						<button onClick={()=>handleStartMessage(user.id)}>Message</button>
					</div>
					<div className="follow-btn">
						{user.followed
							? <button disabled={isAllowedFollow.some(id => id === user.id)}
								onClick={() => { usersUnfollowed(user.id) }}>Unfollow</button>
							: <button disabled={isAllowedFollow.some(id => id === user.id)}
								onClick={() => { usersFollowed(user.id) }}>Follow</button>}
					</div>
				</div>
				<NavLink to={'/user-profile/' + user.id} className="link">View Profile</NavLink>
			</div>
		</div>

	)
}


export default User;