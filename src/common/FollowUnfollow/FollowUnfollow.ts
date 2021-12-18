import React from 'react';

export const FollowUnfollow = (items: any, itemId: any, usersId: number, newObj: any) => {
	return items.map((u: any) => {
		if (u[itemId] === usersId) {
			return { ...u, ...newObj }
		}
		return u;
	});
}