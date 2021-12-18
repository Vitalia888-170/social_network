import React from 'react';
import { NavLink } from 'react-router-dom';
import { navData } from './navData';
//@ts-ignore
import styles from "../header.module.css";

export const NavBar = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.navbarList}>
				{
					navData.map(menuItem => {
						return (
							<li className={styles.items} key={menuItem.id}>
								<NavLink className={styles.navbarLink} activeClassName={styles.active} to={menuItem.link} >{menuItem.name}</NavLink>
							</li>
						)
					})
				}
			</ul>
		</nav>

	);
}
