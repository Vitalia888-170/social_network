import React from 'react'
import { useSelector } from 'react-redux';
import { NewsCard } from '../../components/News/NewsCard';
import { getTopNewsSelector } from '../../selectors/selectors';

export  const TopNews:React.FC=()=> {
  let topNews=useSelector(getTopNewsSelector);

  return (
    <>
      {//@ts-ignore
      topNews? topNews.map((item, index)=><div key={index}><NewsCard topNews={item}/></div>): 'no news'}

    </>
  )
}
