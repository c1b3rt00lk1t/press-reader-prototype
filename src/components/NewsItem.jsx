import React from "react";
import Tags from "./Tags";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";

const NewsItem = ({ item }) => {
  return (
    <li className="news-item">
      <div >
      <div className="horizontal align-items-center margin-lines">
            <FaTag className="news-item-tag " />
            <Tags tags={item.tags} />
          </div>
        <div className="news-item-title line-clamp-2 margin-lines">{item.title}
        </div>
        <div className="news-item-source margin-lines">
          {item.date} - {item.source}
        </div>

        <div className="horizontal margin-lines">
          <div className="horizontal  align-items-center vw-40">
            <FaLocationArrow className="news-item-tag" />
            <Tags  tags={item.zone} />
          </div>
          <div className="horizontal  align-items-center vw-40">
            <FaIndustry className="news-item-tag" />
            <Tags tags={item.sector} />
          </div>
        </div>
        
      </div>
    </li>
  );
};

export default NewsItem;
