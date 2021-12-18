import React, { useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
//@ts-ignore
import styles from '../../pages/Chat/chat.module.css';
type PropsType = {
   onEmojiClick: (event: object, emojiObject: any) => void
}
export const EmojiPicker: React.FC<PropsType> = (props) => {

   return (
      <div className={styles.emojiContainer}>
         <Picker
            onEmojiClick={props.onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
         />
      </div>
   )
}