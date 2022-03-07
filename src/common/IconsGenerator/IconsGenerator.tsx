import React from 'react';
import { FaFacebook, FaStackOverflow, FaVk, FaTwitter, FaInstagram, FaYoutube, FaGithub, FaLinkedinIn } from "react-icons/fa";
//@ts-ignore
import styles from '../../pages/Main/main.module.css'

export const IconsGenerator = (title: string) => {
   switch (title) {
      case 'facebook':
         return <FaFacebook className={styles.mediaIcons} />
         break;
      case 'website':
         return <FaStackOverflow className={styles.mediaIcons} />
         break;
      case 'vk':
         return <FaVk className={styles.mediaIcons} />
         break;
      case 'twitter':
         return <FaTwitter className={styles.mediaIcons} />
         break;
      case 'instagram':
         return <FaInstagram className={styles.mediaIcons} />
         break;
      case 'youtube':
         return <FaYoutube className={styles.mediaIcons} />
         break;
      case 'github':
         return <FaGithub className={styles.mediaIcons} />
         break;
      case 'mainLink':
         return <FaLinkedinIn className={styles.mediaIcons} />
         break;
   }
}
