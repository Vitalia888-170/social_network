import React, { useEffect, useRef, useState } from 'react'
//@ts-ignore
import styles from '../../pages/Chat/chat.module.css'
//@ts-ignore
import avatar from '../../pages/Users/avatar.jpg';
import { useSelector } from 'react-redux';
import { getMessages } from '../../selectors/selectors';


export const Messages: React.FC = () => {
   console.log('messages');
   const messages = useSelector(getMessages);
   const messageEmptyRef = useRef<HTMLDivElement>(null);
   const [autoScrollActive, setAutoScrollActive] = useState(false);

   useEffect(() => {
      if (messageEmptyRef.current && autoScrollActive) {
         messageEmptyRef.current.scrollIntoView({ behavior: 'smooth' });
      }
   }, [messages]);

   const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      let element = e.currentTarget;
      if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 200) {
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
   return (
      <div className={styles.messageBlock} onScroll={scrollHandler}>
         {messages.map((message) => {
            return <div className={message.userId === 9725 ? styles.myMessageContainer : styles.messageContainer} key={message.id}>
               {setImage(message.photo)}
               <div className={styles.messageContent}>
                  <h4>{message.userName}</h4>
                  <p>{message.message}</p>
               </div>
            </div>
         })}
         <div ref={messageEmptyRef}></div>
      </div>
   )
}
