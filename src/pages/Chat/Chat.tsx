import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddMessageForm } from '../../components/AddMessageForm/AddMessageForm';
import { Messages } from '../../components/Messages/Messages';
import { startGetMessage, stopGetMessage } from '../../redux/chat-reducer';
import { getConnectStatus } from '../../selectors/selectors';
//@ts-ignore
import styles from './chat.module.css'


const Chat: React.FC = () => {
   const status = useSelector(getConnectStatus);
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
         <div className={styles.chatContainer}>
            <Messages />
            <AddMessageForm />
         </div>
      </>
   )
}
export default Chat;
