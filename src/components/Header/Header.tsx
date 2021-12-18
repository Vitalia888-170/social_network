import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/auth-reducer';
import { getLogin } from '../../selectors/selectors';
import { IoCodeSharp } from "react-icons/io5";
import { NavBar } from './Navbar/NavBar';
//@ts-ignore
import styles from "./header.module.css";
import { Notifications } from './Notifications/Notifications';


type PropsType = {}
export const Header: React.FC<PropsType> = () => {
	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(Logout());
		<Redirect to='/login' />
	}
	return (
		<header className={styles.header}>
			<div className={styles.mediaTitle}>
				<IoCodeSharp className={styles.logo} />
				<h2>Devi</h2>
			</div>
			<NavBar />
			<Notifications />
			<div>
				<div className={styles.login}>
					<div className={styles.loginBlock}><NavLink to={'/login'} className={styles.loginButton} onClick={handleClick}>Sign out</NavLink> </div>
				</div>
			</div>
		</header>
	);
}

export default Header;