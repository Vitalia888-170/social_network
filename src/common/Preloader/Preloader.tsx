import React from 'react';
//@ts-ignore
import PreloaderImage from './preloader.svg';
type PropsType = {
	isFetching: boolean
}

const Preloader: React.FC<PropsType> = (props) => {

	return (

		<div>
			{props.isFetching ? <img src={PreloaderImage} /> : null}
		</div>

	)
}

export default Preloader;