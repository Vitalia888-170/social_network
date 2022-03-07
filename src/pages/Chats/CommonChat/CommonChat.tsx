import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessageForm } from '../../../components/AddMessageForm/AddMessageForm';
import { Messages } from '../../../components/Messages/Messages';
import { startGetMessage, stopGetMessage, sendMessage } from '../../../redux/chat-reducer';
import { getConnectStatus } from '../../../selectors/selectors';
import { getCommonChatMessages } from '../../../selectors/selectors';

const CommonChat: React.FC = () => {
  const status = useSelector(getConnectStatus);
  const messages = useSelector(getCommonChatMessages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetMessage());
    return () => {
      dispatch(stopGetMessage());
    }
  }, []);

  return (
    <>
      {status === 'error' && <div>Something got wrong. Please, refresh page</div>}
      <Messages messages={messages} />
      <AddMessageForm
        callback={sendMessage}
        placeholder="Enter message..."
        btnTitle="Send"
      />
    </>
  )
}
export default CommonChat;
