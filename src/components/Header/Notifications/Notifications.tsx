import React from 'react'
import { notificData } from './notificData';
//@ts-ignore
import styles from '../header.module.css';

export const Notifications: React.FC = () => {
   return (
      <ul className={styles.notifications}>
         {
            notificData.map(item => {
               return (
                  <li key={item.id}>
                     {item.icon}
                  </li>
               )
            })
         }
      </ul>
   )
}
