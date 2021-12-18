import React, { useEffect } from 'react';
import Pagination from '../../common/Pagination/Pagination';
import { FilterType } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from '../../redux/redux-state';
import { getTotalCountPage, getPageSize, getCurrentPage, getTotalUsers, getIsAllowedFollow, getUserFilter } from '../../selectors/selectors';
import { getUsers, usersUnfollow, usersFollow, actions } from '../../redux/users-reducer';
import UserSearchForm from './UsersForm';
import User from './User';
import '../../App.css';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring';

type PropType = {}
type QueryParamsType = { term?: string, friend?: string, page?: string };

const Users: React.FC<PropType> = () => {
	const totalCountPage = useSelector(getTotalCountPage);
	const currentPage = useSelector(getCurrentPage);
	const users = useSelector(getTotalUsers);
	const pageSize = useSelector(getPageSize);
	const isAllowedFollow = useSelector(getIsAllowedFollow);
	const filter = useSelector(getUserFilter);
	const history = useHistory();

	const dispatch = useDispatch();
	const onPageChanged = (pageNumber: number) => {
		dispatch(getUsers(pageNumber, pageSize, filter, pageNumber));
	}
	const onFilterChanged = (filter: FilterType) => {
		dispatch(getUsers(1, pageSize, filter, 1));
	}
	const usersFollowed = (id: number) => {
		dispatch(usersFollow(id));
	}
	const usersUnfollowed = (id: number) => {
		dispatch(usersUnfollow(id));
	}


	useEffect(() => {
		const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
		let actualPage = currentPage;
		let actualFilterData = filter;
		if (!!parsed.page) actualPage = Number(parsed.page);
		if (!!parsed.term) actualFilterData = { ...actualFilterData, term: parsed.term as string };
		switch (parsed.friend) {
			case "null":
				actualFilterData = { ...actualFilterData, friend: null }
				break;
			case "true":
				actualFilterData = { ...actualFilterData, friend: true }
				break;
			case "false":
				actualFilterData = { ...actualFilterData, friend: false }
		}
		dispatch(getUsers(actualPage, pageSize, actualFilterData, actualPage))
	}, []);

	useEffect(() => {
		const queryParametresObg: QueryParamsType = {};
		if (!!filter.term) queryParametresObg.term = filter.term;
		if (filter.friend !== null) queryParametresObg.friend = String(filter.friend);
		if (currentPage !== 1) queryParametresObg.page = String(currentPage)

		history.push({
			pathname: '/searching',
			search: queryString.stringify(queryParametresObg)
		})
	}, [filter, currentPage]);
	console.log(currentPage);
	return (
		<div>
			<UserSearchForm onFilterChanged={onFilterChanged} />
			<Pagination totalCountPage={totalCountPage} pageSize={pageSize}
				onPageChanged={onPageChanged} currentPage={currentPage} />
			<div className="user-container">
				{users.map((u, index) => <User key={index} user={u} isAllowedFollow={isAllowedFollow}
					usersUnfollowed={usersUnfollowed} usersFollowed={usersFollowed} />
				)
				}
			</div>
		</div>

	)
}



export default Users;