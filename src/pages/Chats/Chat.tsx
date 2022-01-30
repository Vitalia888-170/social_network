import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDialogsThunk } from '../../redux/dialogs-reducer';
import CommonChat from './CommonChat/CommonChat';
import DialogList from './Dialogs/DialogsList';
//@ts-ignore
import styles from './chat.module.css'
import { CurrentChat } from './CurrentChat';
import { getDialogsUserIdSelector } from '../../selectors/selectors';


const Chat=()=> {
  const dialogId=useSelector(getDialogsUserIdSelector);
  return (
    <div className={styles.chat}>
      <div className={styles.dialogsContainer}>
        <DialogList/>
      </div>
      <div className={styles.chatContainer}>
        {dialogId === 0
        ? <CommonChat/>
        : <CurrentChat/>}
      </div>
    </div>
  )
}
export default Chat;
