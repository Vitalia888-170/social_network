import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect, DispatchProp } from "react-redux";
import { AppStateType } from '../redux/redux-state';


let mapStateToPropsForRedirect = (state: AppStateType) => ({
	isAuth: state.auth.isAuth
} as MapPropType);

type MapPropType = {
	isAuth: boolean
}
type MapDispatchType = {}
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapPropType & MapDispatchType> = (props) => {
		let { isAuth, ...restProps } = props;
		if (!isAuth) return <Redirect to={"/login"} />
		return <WrappedComponent {...restProps as WCP} />
	}
	let ConnectAuthRedirect = connect<MapPropType, MapDispatchType, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent);
	return ConnectAuthRedirect;
}







