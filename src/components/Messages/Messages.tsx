import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import styles from '../../pages/Chats/chat.module.css'
//@ts-ignore
import avatar from '../../pages/Users/avatar.jpg';
//@ts-ignore
import noMessageIcon from '../../pages/Chats/images/no-message.png';

type PropsType={
   messages:any
}

export const Messages: React.FC<PropsType> = ({messages}) => {
   console.log(messages);
   const messageEmptyRef = useRef<HTMLDivElement>(null);
   const [autoScrollActive, setAutoScrollActive] = useState(false);

   useEffect(() => {
      if (messageEmptyRef.current && autoScrollActive) {
         messageEmptyRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [messages]);

   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      let element = e.currentTarget;
      if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 20) {
         setAutoScrollActive(true);
      } else {
         setAutoScrollActive(false);
      }
   }
   const setImage = (userAvatar: string) => {
      if (!userAvatar) {
         return <img src={avatar} alt="ava" />
      } else {
         return <img src={userAvatar} alt="ava" />
      }
   }
   if(messages.length > 0){
      return <div className={styles.messageBlock} onScroll={scrollHandler}>
      {messages.map((message:any) => {
         return <div className={message.userId === 9725 ? styles.myMessageContainer : styles.messageContainer} key={message.id}>
            {message.photo && setImage(message.photo)}
            <div className={styles.messageContent}>
               <h4>{message.userName ? message.userName : ''}</h4>
               <p>{message.message}</p>
            </div>
         </div>
      })}
      <div ref={messageEmptyRef}></div>
   </div>
   }else{
      return <div className={styles.messagesAlert}>
         <img src={noMessageIcon} alt="no message icon" />
         <p>No messages yet</p>
     </div>
   }
}
