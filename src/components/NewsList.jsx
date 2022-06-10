import React from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ data }) => {
  return (
    <>
      <ul>
        {data.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default NewsList;
