import React from "react";

const SourceTypes = {
  name: String,
  url: String,
};
const PropsTypes = {
  title: String,
  content: String,
  description: String,
  image: String,
  publishedAt: String,
  source: SourceTypes,
  url: String,
};

export const NewsCard: React.FC = (props) => {
  //@ts-ignore
  const { title, description, image, source, url } = props.topNews;
  return (
    <div className="news-container">
      <h4>{title}</h4>
      <hr />
      {image && <img src={image} alt="news" />}
      <p>{description}</p>
      <p className="news-author">Source: {source.name}</p>
      <a className="news-link" href={url} target="_blank">View</a>
    </div>
  );
};
