import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActualNews } from "../../redux/news-reducer";
import { NewsForm } from "./NewsForm";
import { TopNews } from "./TopNews";

const News: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActualNews());
  }, []);
  return (
    <div className="news">
			<NewsForm/>
      <TopNews />
    </div>
  );
};

export default News;
