import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessageForm } from '../../../components/AddMessageForm/AddMessageForm';
import { Messages } from '../../../components/Messages/Messages';
import { startGetMessage, stopGetMessage } from '../../../redux/chat-reducer';
import { getConnectStatus } from '../../../selectors/selectors';
//@ts-ignore
import styles from '../chat.module.css'
import { getCommonChatMessages } from '../../../selectors/selectors';

const CommonChat: React.FC = () => {
   const status = useSelector(getConnectStatus);
   const messages=useSelector(getCommonChatMessages)
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(startGetMessage());
      return () => {
         dispatch(stopGetMessage());
      }
   }, []);

   return (
      <>
         { status === 'error' && <div>Something got wrong. Please, refresh page</div>}
         <div>
            <Messages messages={messages}/>
            <AddMessageForm />
         </div>
      </>
   )
}
export default CommonChat;
