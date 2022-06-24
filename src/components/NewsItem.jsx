import React from "react";
import Tags from "./Tags";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import { useContext } from 'react';
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from 'react-router-dom'

const NewsItem = ({ item }) => {

  const {setPostSelected, setDataToShare} = useContext(PressReaderContext);
  const navigate = useNavigate();

  const handleClickOnItem = () => {
    setPostSelected(item.id);
    setDataToShare({
      title: "PressReader",
      text: item.title,
      url: item.url,
    });
    navigate(`/post/${item.id}`)
  }

  return (
    <li onClick={handleClickOnItem} className="news-item">
      <div >
      <div className="horizontal align-items-center margin-lines">
            <FaTag className="news-item-tag " />
            <Tags tags={item.tags} />
          </div>
        <div className="news-item-title line-clamp-2 margin-lines padding-lines">{item.title}
        </div>
        <div className="news-item-source margin-lines">
          {item.date} - {item.source}
        </div>

        <div className="horizontal margin-lines">
          <div className="horizontal  align-items-center vw-40">
            <FaLocationArrow className="news-item-tag" />
            <Tags  tags={item.zones} />
          </div>
          <div className="horizontal  align-items-center vw-40">
            <FaIndustry className="news-item-tag" />
            <Tags tags={item.sectors} />
          </div>
        </div>
        
      </div>
    </li>
  );
};

export default NewsItem;
