import React from "react";

const NewsItem = ({ item }) => {
  return (
    <li className="news-item">
      <div>
        <div className="news-item-title">{item.title}</div>
        <div className="news-item-source">
          {item.date} - {item.source}
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
