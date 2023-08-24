import React, { useEffect, useRef } from "react";
import Tags from "./Tags";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineArticle, MdOutlineLink } from "react-icons/md";

const NewsItem = ({ item }) => {
  const { setPostSelected, setDataToShare, postSelected } =
    useContext(PressReaderContext);
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

  /* Forces a scroll to the element that has the same id than the las postSelected */
  const myRef = useRef(null);
  const useMountEffect = (fun) => useEffect(fun, [fun]);
  const executeScroll = () => {
    if (postSelected === item.id) {
      myRef.current.scrollIntoView({
        block: "start",
        inline: "nearest",
      });
    }
  };

  useMountEffect(executeScroll); // Scroll on mount

  const writeTextInClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleTitleClick =
    ({ title, date, source }) =>
    (ev) => {
      ev.stopPropagation();
      writeTextInClipboard(
        `${title} (${source}, ${date.slice(0, 4)}-${date
          .slice(5, 6)
          .padStart(2, "0")}-${date.slice(7, 8).padStart(2, "0")})`
      );
    };

  const handleLinkClick =
    ({ url2 }) =>
    (ev) => {
      ev.stopPropagation();
      writeTextInClipboard(`${url2}`);
    };

  return (
    <li onClick={handleClickOnItem} ref={myRef} className="news-item">
      <div>
        <div className="horizontal align-items-center margin-lines min-height-1em">
          {!!item.tags && <FaTag className="news-item-tag " />}
          <Tags tags={item.tags} type="1" />
          <button
            onClick={handleTitleClick(item)}
            style={{
              backgroundColor: "white",
              color: "darkblue",
              border: "none",
              cursor: "pointer",
            }}
          >
            <MdOutlineArticle style={{ fontSize: "1.1rem" }}></MdOutlineArticle>
          </button>{" "}
          <button
            onClick={handleLinkClick(item)}
            style={{
              backgroundColor: "white",
              color: "darkblue",
              border: "none",
              cursor: "pointer",
            }}
          >
            <MdOutlineLink style={{ fontSize: "1.1rem" }}></MdOutlineLink>
          </button>
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
            <Tags tags={item.zones} type="2" marginRight={true} />
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
