import React from 'react'
import { useSelector } from 'react-redux';
import { LineTitle } from '../Avatar/Avatar';
import { getTotalUsers } from '../../selectors/selectors';

export const Suggestions = () => {
   const users = useSelector(getTotalUsers);
   let randomUser = Math.random() * users.length;
   for (let i = 0; i <= 7; i++) {

   }
   return (
      <div className="suggestions">
         <LineTitle>Suggestions</LineTitle>


      </div>
   )
}
