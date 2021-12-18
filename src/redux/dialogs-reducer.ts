import { DialogsType, MessagesType } from '../types/types';
import { InferActionsTypes } from './redux-state';

let initialState = {
	dialogs: [
		{ id: 'user_Andrew', name: 'Andrew' },
		{ id: 'user_Elli', name: 'Elli' },
		{ id: 'user_Monik', name: 'Monik' },
		{ id: 'user_John', name: 'John' },
		{ id: 'user_Alex', name: 'Alex' },
		{ id: 'user_Mia', name: 'Mia' },
		{ id: 'user_Peter', name: 'Peter' },
		{ id: 'user_Ben', name: 'Ben' },
		{ id: 'user_Nessy', name: 'Nessy' }
	] as Array<DialogsType>,
	messages: [
		{ id: 1, message: "Hello, how are you?" },
		{ id: 2, message: "I have recently arrived to New York" },
		{ id: 3, message: "Wow! It's cool! Will you be all your rest there?" },
		{ id: 4, message: "Unfortunately... But you will be able to visit me. How you like that?" },
		{ id: 5, message: "I don't know if I have more free time. But I promise... I think about that." },
		{ id: 6, message: "Okay, but I have some surprizes for you. So, I will wait." },
	] as Array<MessagesType>,
}

let dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

	switch (action.type) {

		case 'ADD-MESSAGE':
			let body = action.newDialogBody;
			return {
				...state,
				messages: [...state.messages, { id: 7, message: body }]
			};

		default:
			return state;
	}
}

export const actions = {
	addMessage: (newDialogBody: string) => ({ type: 'ADD-MESSAGE', newDialogBody } as const)
}

export default dialogReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;