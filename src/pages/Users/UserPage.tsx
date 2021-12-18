import React, { useEffect } from 'react';
import Users from './Users';
import { useSelector } from 'react-redux';
import '../../App.css';
import Preloader from '../../common/Preloader/Preloader';
import { getIsFetching } from '../../selectors/selectors';

type PropsType = {}
export const UserPage: React.FC<PropsType> = () => {
	const isFetching = useSelector(getIsFetching);

	return (
		<>
			<div className="preloader"><Preloader isFetching={isFetching} /></div>
			<Users />
		</>
	)
}

