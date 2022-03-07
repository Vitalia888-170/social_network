import React, { useEffect, useRef, useState } from 'react'
import { AiOutlinePaperClip, AiOutlineSend } from "react-icons/ai";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import styles from '../../pages/Chats/chat.module.css'
import { getConnectStatus, getDialogsUserIdSelector } from '../../selectors/selectors';
import { EmojiPicker } from '../EmojiPicker/EmojiPicker';
type WebsocketType = 'pending' | 'ready';
type PropsType = {
   callback: (dialogId: number, message: string) => void,
   btnTitle: string,
   placeholder: string
}

export const AddMessageForm: React.FC<PropsType> = (props) => {
   const [message, setMessage] = useState('');
   const [isPannelOpen, setIsPannelOpen] = useState(false);
   const [chosenEmoji, setChosenEmoji] = useState(null);
   const status = useSelector(getConnectStatus);
   const dialogId = useSelector(getDialogsUserIdSelector);
   const dispatch = useDispatch();
   const formRef = useRef(null);
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
      dispatch(props.callback(dialogId, message))
      setMessage('');
   }
   const openEmojiPannel = () => {
      setIsPannelOpen(!isPannelOpen)
   }
   const handleSubmit=(e:any)=>{
e.preventDefault();
//@ts-ignore
const data = new FormData(formRef);
console.log(data);
   }
   return (
      <form className={styles.formContainer} onSubmit={handleSubmit} ref={formRef}>
         <div className={styles.uploadfile}>
            <AiOutlinePaperClip className={styles.clip} />
            <input
            name="file"
            type="file"
            />
         </div>
         <div className={styles.inputContainer}>
            <textarea name="text"
               onChange={(e) => handleMessage(e.currentTarget.value)}
               value={message}
               placeholder={props.placeholder}
            />
            <HiOutlineEmojiHappy onClick={openEmojiPannel} className={styles.face} />
            {isPannelOpen ? <EmojiPicker onEmojiClick={onEmojiClick} /> : null}
         </div>
         <button>
            <span>{props.btnTitle}</span>
            {props.btnTitle==='Send' ? <AiOutlineSend className={styles.btn} /> :null}
         </button>
      </form>
   )
}
