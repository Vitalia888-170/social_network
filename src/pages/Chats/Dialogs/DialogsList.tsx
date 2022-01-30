import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogsSelector } from '../../../selectors/selectors';
import {actions, getDialogsThunk} from '../../../redux/dialogs-reducer';
//@ts-ignore
import styles from '../chat.module.css'


const DialogList: React.FC = (props) => {
	let dialogList=useSelector(getDialogsSelector);
	let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getDialogsThunk());
  }, [])

	const handleUserId=(userId:number)=>{
		console.log(userId);
dispatch(actions.setActualUserId(userId))
	}
	return (
		<div className={styles.dialogsContainer}>
			{
				dialogList.map((item, index)=>{
					return <div className={styles.dialogsContainer__item} key={index} onClick={()=>handleUserId(item.id)}>
						<img src={item.photos.small} alt="avatar" />
						<h4>{item.userName}</h4>
						{item.newMessagesCount > 0 && <div className={styles.indicators}>{item.newMessagesCount}</div>}
					</div>
				})
			}
		</div>
	)
}

export default DialogList;