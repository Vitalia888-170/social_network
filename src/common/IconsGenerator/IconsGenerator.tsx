import React from 'react';
import { FaFacebook, FaStackOverflow, FaVk, FaTwitter, FaInstagram, FaYoutube, FaGithub, FaLinkedinIn } from "react-icons/fa";


export const IconsGenerator = (title: string) => {
   switch (title) {
      case 'facebook':
         return <FaFacebook className="media-icons" />
         break;
      case 'website':
         return <FaStackOverflow className="media-icons" />
         break;
      case 'vk':
         return <FaVk className="media-icons" />
         break;
      case 'twitter':
         return <FaTwitter className="media-icons" />
         break;
      case 'instagram':
         return <FaInstagram className="media-icons" />
         break;
      case 'youtube':
         return <FaYoutube className="media-icons" />
         break;
      case 'github':
         return <FaGithub className="media-icons" />
         break;
      case 'mainLink':
         return <FaLinkedinIn className="media-icons" />
         break;
   }
}
