import React, { useEffect, useRef } from "react";
import Tags from "./Tags";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import ClipboardContext from "../contexts/ClipboardContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineArticle, MdOutlineLink } from "react-icons/md";
import Proptypes from "prop-types";

const NewsItem = ({ item }) => {
  const { setPostSelected, setDataToShare, postSelected } =
    useContext(PressReaderContext);
  const { writeTextInClipboard, writeInClipboard } =
    useContext(ClipboardContext);
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

  const handleTitleClick = (item) => (ev) => {
    ev.stopPropagation();
    writeInClipboard(item);
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
            className="phone-hide"
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
            className="phone-hide"
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
          {item.date} - {item.source} - {`session: ${item.session}`}
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

NewsItem.propTypes = {
  item: Proptypes.object,
};

export default NewsItem;
