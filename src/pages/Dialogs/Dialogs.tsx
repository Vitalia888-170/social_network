import React from 'react';
import MessageItem from './MessageItem/MessageItem';
import DialogFormRedux from './AddMessageForm';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogs } from '../../selectors/selectors';
import { actions } from './../../redux/dialogs-reducer';
export type newMessageFormType = {
	newDialogBody: string
}


const Dialogs: React.FC = () => {
	const dialogs = useSelector(getDialogs);
	const dispatch = useDispatch();
	let messagesElem = dialogs.messages.map(letter => <MessageItem key={uuidv4()} message={letter.message} />);


	let addMessage = (values: newMessageFormType) => {
		dispatch(actions.addMessage(values.newDialogBody));
	}


	return (
		<div className="dialog-container">
			<div className="dialog-messages">
				<div className="dialog-enter">
					<DialogFormRedux onSubmit={addMessage} />
				</div>
				<div>{messagesElem}</div>
			</div>
		</div>

	)
}

export default Dialogs;