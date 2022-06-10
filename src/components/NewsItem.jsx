import React from "react";

const NewsItem = ({item}) => {
  return <li className="news-item" >{item.title}</li>;
};

export default NewsItem;
