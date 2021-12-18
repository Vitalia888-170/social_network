import React, { useEffect, useState } from 'react';
import '../../App.css';
//@ts-ignore
import img1 from './images/img1.jpg';
//@ts-ignore
import img2 from './images/img2.jpg';
//@ts-ignore
import img3 from './images/img4.jpg';


const screenSaver = [
   { id: 1, image: img1 },
   { id: 2, image: img2 },
   { id: 3, image: img3 }
]

export const Slider: React.FC = () => {
   const [slideIndex, setSlideIndex] = useState(0);
   const { image } = screenSaver[slideIndex];
   useEffect(() => {
      const interval = setInterval(() => {
         setSlideIndex((currentSlide) =>
            currentSlide === screenSaver.length - 1 ? 0 : currentSlide + 1
         )
      }, 3000)
      return () => clearInterval(interval)
   }, [])

   return (
      <div className="slider-container">
         <img className="slider-img" src={image} alt="slider image" />
      </div>
   );
}
