import React, { useEffect, useState } from 'react'
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import styles from '../../pages/Chats/chat.module.css'
import { sendMessage } from '../../redux/chat-reducer';
import { sendUserMessageThunk } from '../../redux/dialogs-reducer';
import { getConnectStatus, getDialogsUserIdSelector } from '../../selectors/selectors';
import { EmojiPicker } from '../EmojiPicker/EmojiPicker';
type WebsocketType = 'pending' | 'ready';

export const AddMessageForm: React.FC = () => {
   const [message, setMessage] = useState('');
   const [isPannelOpen, setIsPannelOpen] = useState(false);
   const [chosenEmoji, setChosenEmoji] = useState(null);
   const status = useSelector(getConnectStatus);
   const dialogId=useSelector(getDialogsUserIdSelector);
   const dispatch = useDispatch();

   const onEmojiClick = (event: object, emojiObject: any) => {
      setChosenEmoji(emojiObject.emoji);
   };
   useEffect(() => {
      if (chosenEmoji) {
         setMessage(message + chosenEmoji);
      } else {
         setMessage(message);
      }
   }, [chosenEmoji]);

   const handleMessage = (text: string) => {
      setMessage(text);
   }


   const sendCurrentMessage = () => {
      if (!message) {
         return;
      }
      if(dialogId===0){
         dispatch(sendMessage(message));
      }else{
         dispatch(sendUserMessageThunk(dialogId, message))
      }
      setMessage('');
   }
   const openEmojiPannel = () => {
      setIsPannelOpen(!isPannelOpen)
   }
   return (
      <div className={styles.formContainer}>
         <div className={styles.uploadfile}>
            <AiOutlinePaperClip className={styles.clip} />
            <input type="file" />
         </div>
         <div className={styles.inputContainer}>
            <textarea onChange={(e) => handleMessage(e.currentTarget.value)} value={message} placeholder="Enter your message..." />
            <HiOutlineEmojiHappy onClick={openEmojiPannel} className={styles.face} />
            {isPannelOpen ? <EmojiPicker onEmojiClick={onEmojiClick} /> : null}
         </div>
         <button disabled={status !== 'ready'} onClick={sendCurrentMessage}>
            <span>Send</span>
            <AiOutlineSend className={styles.btn} />
         </button>
      </div>
   )
}
