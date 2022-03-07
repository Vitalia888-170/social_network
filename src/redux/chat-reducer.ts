import { FormAction } from 'redux-form';
import { v4 as uuidv4 } from 'uuid';
import { chatAPI, MessageType, StatusChangedType, StatusType } from '../api/chat-api';
import { BaseThunkType, InferActionsTypes } from './redux-state';

let initialState = {
	messages: [] as ChatMessagesType[],
	connectingStatus: 'pending' as StatusType
}

let chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'SET_MESSAGES':
			return {
				...state,
				messages: [...state.messages, ...action.payload.map(m => ({ ...m, id: uuidv4() }))]
			};
		case 'SET_STATUS':
			return {
				...state,
				connectingStatus: action.payload
			};

		default:
			return state
	}
}
export const actions = {
	setMessages: (message: MessageType[]) => ({
		type: 'SET_MESSAGES', payload: message
	} as const),
	setConnectStatus: (status: StatusType) => ({
		type: 'SET_STATUS', payload: status
	} as const),
}
let _newMessageHandler: ((messages: MessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: any) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(actions.setMessages(messages))
		}
	}

	return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: any) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = (status) => {
			dispatch(actions.setConnectStatus(status))
		}
	}

	return _statusChangedHandler;
}

export const startGetMessage = (): ThunkType => {
	return async (dispatch) => {
		chatAPI.start();
		chatAPI.subscribe('received-message', newMessageHandlerCreator(dispatch))
		chatAPI.subscribe('changed-status', statusChangedHandlerCreator(dispatch))
	}
}

export const stopGetMessage = (): ThunkType => {
	return async (dispatch) => {
		chatAPI.unsubscribe('received-message', newMessageHandlerCreator(dispatch));
		chatAPI.unsubscribe('changed-status', statusChangedHandlerCreator(dispatch));
		chatAPI.stop();
	}
}

export const sendMessage = (id:number, message: string): ThunkType => {
	return async () => {
		chatAPI.send(message);
	}
}
export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>
type ChatMessagesType = MessageType & { id: string };
