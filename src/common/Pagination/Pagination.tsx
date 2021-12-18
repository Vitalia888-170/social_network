import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import '../../App.css';



type PropType = {
	totalCountPage: number,
	pageSize: number,
	portionSize?: number,
	currentPage: number,
	onPageChanged: (page: number) => void
}

const Paginator: React.FC<PropType> = ({ totalCountPage, pageSize, portionSize = 10, ...props }) => {
	let countPages = Math.ceil(totalCountPage / pageSize);
	let pages: Array<number> = [];
	for (let i = 1; i <= countPages; i++) {
		pages.push(i);
	}
	let portionCount = Math.ceil(countPages / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftSidePageNumber = (portionNumber - 1) * portionSize + 1;
	let rightSidePageNumber = portionNumber * portionSize;

	return (
		<div className="page">
			{portionNumber > 1 && <FaArrowAltCircleLeft className="paginator-btn" onClick={() => { setPortionNumber(portionNumber - 1) }} />
			}
			{ pages.filter(p => p >= leftSidePageNumber && p <= rightSidePageNumber).map((p, index) => <span key={index} className={props.currentPage === p ? "selectedPage" : ""}
				onClick={(e) => { props.onPageChanged(p) }}>{p}</span>
			)
			}
			{portionCount > portionNumber && <FaArrowAltCircleRight className="paginator-btn" onClick={() => { setPortionNumber(portionNumber + 1) }} />
			}
		</div>
	)
}



export default Paginator;