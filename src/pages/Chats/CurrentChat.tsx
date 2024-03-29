import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessageForm } from '../../components/AddMessageForm/AddMessageForm';
import { Messages } from '../../components/Messages/Messages';
import { setMessagesThunk, sendUserMessageThunk } from '../../redux/dialogs-reducer';
import { getDialogsUserIdSelector, getUserMessagesSelector } from '../../selectors/selectors';

export const CurrentChat: React.FC = () => {
  let messages = useSelector(getUserMessagesSelector);
  const dialogId = useSelector(getDialogsUserIdSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMessagesThunk(dialogId));
  }, [dialogId])

  return (
    <>
      <Messages messages={messages} />
      <AddMessageForm
        callback={sendUserMessageThunk}
        placeholder="Enter message..."
        btnTitle="Send"
      />
    </>
  )
}

