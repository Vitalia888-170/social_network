import { createStore, combineReducers, applyMiddleware, Action } from "redux";
import dialogReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import chatReducer from "./chat-reducer";
import newsReducer from "./news-reducer";
import userProfileReducer from "./userProfile-reducer";
import postsReducer from "./post-reducer";



let rootReducers = combineReducers({
	post: postsReducer,
	dialogsPage: dialogReducer,
	usersPage: usersReducer,
	auth: authReducer,
	profile: profileReducer,
	form: formReducer,
	chat: chatReducer,
	news:newsReducer,
	userProfile:userProfileReducer
});

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
type rootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<rootReducersType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

export default store;