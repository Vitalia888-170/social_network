import React from 'react';
import '../../../App.css';
import { NavLink } from 'react-router-dom';
type PropsType = {
	name: string,
	id: string
}

const DialogItem: React.FC<PropsType> = (props) => {
	let path = "/dialogs/" + props.id;
	return (
		<NavLink to={path} className="dialoge">{props.name}</NavLink>
	)
}

export default DialogItem;