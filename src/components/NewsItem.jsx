import React from "react";
import Tags from "./Tags";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from "react-router-dom";

const NewsItem = ({ item }) => {
  const { setPostSelected, setDataToShare } = useContext(PressReaderContext);
  const navigate = useNavigate();

  const handleClickOnItem = () => {
    const text = `${item.date} - ${item.source} - ${item.title}`;
    setPostSelected(item.id);
    setDataToShare({
      title: "PressReader",
      text: text,
      url: item.url2,
    });
    navigate(`/post/${item.id}`);
  };

  return (
    <li onClick={handleClickOnItem} className="news-item">
      <div>
        <div className="horizontal align-items-center margin-lines min-height-1em">
          {!!item.tags && <FaTag className="news-item-tag " />}
          <Tags tags={item.tags} type="1" />
        </div>
        <div className="news-item-title line-clamp-2 margin-lines padding-lines">
          {item.title}
        </div>
        <div className="news-item-source margin-lines">
          {item.date} - {item.source}
        </div>

        <div className="horizontal margin-lines">
          <div className="horizontal  align-items-center ">
            {!!item.zones && <FaLocationArrow className="news-item-tag" />}
            <Tags tags={item.zones} type="2" marginRight={true}/>
          </div>
          <div className="horizontal  align-items-center ">
            {!!item.sectors && <FaIndustry className="news-item-tag" />}
            <Tags tags={item.sectors} type="2" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
