import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import Tags from "./Tags";
import PressReaderContext from "../contexts/PressReaderContext";

import {
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineLink,
} from "react-icons/md";
import PDFDocument from "./PDFDocument";
import { ErrorBoundary } from "./ErrorBoundary";
import Offline from "./Offline";

const Post = () => {
  const {
    setPostSelected,
    dataOrdered: data,
    setDataToShare,
  } = useContext(PressReaderContext);

  const [pdfContent, setPdfContent] = useState();

  const params = useParams();
  const item = data.filter((a) => `${a.id}` === params.id)[0];
  const indexItem = data.indexOf(item);

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
      text: `${data[indexItem + 1 * sign].date} - ${
        data[indexItem + 1 * sign].source
      } - ${data[indexItem + 1 * sign].title}`,
      url: data[indexItem + 1 * sign].url,
    });
    navigate(`/post/${data[indexItem + 1 * sign].id}`);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(item.url, {
        method: 'GET', 
        mode: 'cors', 
      })
        .then((res) => res.blob())
        .then((data) => {
          setPdfContent(data);
        });
    };

    fetchData();
  }, [item.url]);


  

  return (
    <>
      <div
        className="horizontal align-items-center margin-lines margin-left"
        style={{ justifyContent: "space-between", marginBottom: "2.5vh" }}
      >
        <div className="horizontal align-items-center min-height-1em">
          {!!item.tags && <FaTag className="news-item-tag " />}
          <Tags tags={item.tags} type="1" />
        </div>
        <a
          href={item.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="horizontal align-items-center margin-lines margin-left"
          style={{ marginTop: "-0.5vh" }}
        >
          {" "}
          <MdOutlineLink></MdOutlineLink>
        </a>
        <div className="horizontal align-items-center">
          {!!item.zones && <FaLocationArrow className="news-item-tag" />}
          <Tags tags={item.zones} type="2" marginRight={true} />
        </div>
        <div className="horizontal align-items-center">
          {!!item.sectors && <FaIndustry className="news-item-tag" />}
          <Tags tags={item.sectors} type="2" />
        </div>
      </div>
      <Offline />
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
         
          <ErrorBoundary>
            <PDFDocument url={pdfContent} />
          </ErrorBoundary>
        )}
      </div>
    </>
  );
};

export default Post;
