import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import Tags from "./Tags";
import PressReaderContext from "../contexts/PressReaderContext";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const Post = ({ data }) => {
  const params = useParams();
  const item = data.filter((a) => `${a.id}` === params.id)[0];
  const indexItem = data.indexOf(item);

  const { setSelectedPost } = useContext(PressReaderContext);
  const navigate = useNavigate();

  const handleTouch = (ev) => {
    let el = ev.target;
    while (!el.classList.value.includes("on-touch")) {
      el = el.parentElement;
    }
    const sign = el.classList.value.includes("to-next") ? 1 : -1;
    setSelectedPost(data[indexItem + 1 * sign].id);
    navigate(`/post/${data[indexItem + 1 * sign].id}`);
  };

  return (
    <>
      <div
        className="horizontal align-items-center margin-lines"
        style={{ justifyContent: "space-between", marginBottom: "2.5vh" }}
      >
        <div className="horizontal align-items-center">
          <FaTag className="news-item-tag " />
          <Tags tags={item.tags} />
        </div>
        <div className="horizontal align-items-center">
          <FaLocationArrow className="news-item-tag" />
          <Tags tags={item.zone} />
        </div>
        <div className="horizontal align-items-center">
          <FaIndustry className="news-item-tag" />
          <Tags tags={item.sector} />
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          className="on-touch to-previous horizontal align-items-center justify-items-center"
          onClick={handleTouch}
        >
          <MdNavigateBefore className="previous-next" />
        </div>
        <div
          className="on-touch to-next horizontal align-items-center justify-items-center"
          onClick={handleTouch}
        >
          <MdNavigateNext className="previous-next" />
        </div>
        {!!item.url && (
          <embed
            src={item.url}
            style={{
              margin: "-2.5vw",
              width: "100vw",
              height: "95vh",
              paddingBottom: "5vh",
            }}
            type="application/pdf"
          ></embed>
        )}
      </div>
    </>
  );
};

export default Post;
