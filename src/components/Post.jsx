import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import Tags from "./Tags";
import PressReaderContext from "../contexts/PressReaderContext";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import PDFDocument from "./PDFDocument";

const Post = () => {
  const { setPostSelected, dataOrdered: data , setDataToShare} = useContext(PressReaderContext);

  const params = useParams();
  const item = data.filter((a) => `${a.id}` === params.id)[0];
  const indexItem = data.indexOf(item);

  console.log(item);
  const navigate = useNavigate();

  const handleTouch = (ev) => {
    let el = ev.target;
    while (!el.classList.value.includes("on-touch")) {
      el = el.parentElement;
    }
    const sign = el.classList.value.includes("to-next") ? 1 : -1;
    setPostSelected(data[indexItem + 1 * sign].id);
    setDataToShare({
      title: "PressReader",
      text: `${data[indexItem + 1 * sign].date} - ${data[indexItem + 1 * sign].source} - ${data[indexItem + 1 * sign].title}`,
      url: data[indexItem + 1 * sign].url,
    });
    navigate(`/post/${data[indexItem + 1 * sign].id}`);
  };

  return (
    <>
      <div
        className="horizontal align-items-center margin-lines"
        style={{ justifyContent: "space-between", marginTop: "2.5vh", marginBottom: "2.5vh" }}
      >
        <div className="horizontal align-items-center">
          <FaTag className="news-item-tag " />
          <Tags tags={item.tags} />
        </div>
        <div className="horizontal align-items-center">
          <FaLocationArrow className="news-item-tag" />
          <Tags tags={item.zones} />
        </div>
        <div className="horizontal align-items-center">
          <FaIndustry className="news-item-tag" />
          <Tags tags={item.sectors} />
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
        {!!item.url && <PDFDocument url={item.url} />}
      </div>
    </>
  );
};

export default Post;
