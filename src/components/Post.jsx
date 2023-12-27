import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import Tags from "./Tags";
import PressReaderContext from "../contexts/PressReaderContext";
import ClipboardContext from "../contexts/ClipboardContext";
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
    desktop,
    URLFromSize,
    pdfFiles,
  } = useContext(PressReaderContext);

  const { writeInClipboard } = useContext(ClipboardContext);

  // get the focus for usage of onKeyDown
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const [pdfContent, setPdfContent] = useState();

  const params = useParams();
  const item = data.filter((a) => `${a.id}` === params.id)[0];
  const indexItem = data.indexOf(item);

  const navigate = useNavigate();

  const moveTo = (sign) => {
    const index = indexItem + 1 * sign;
    if (data[index]) {
      setPostSelected(data[index].id);
      setDataToShare({
        title: "PressReader",
        text: `${data[index].date} - ${data[index].source} - ${data[index].title}`,
        url: data[index].url2,
      });
      writeInClipboard(data[index]);
      // Reset pdfContent to null when navigating
      setPdfContent(null);
      navigate(`/post/${data[indexItem + 1 * sign].id}`);
    }
  };

  const handleTouch = (ev) => {
    let el = ev.target;
    while (!el.classList.value.includes("on-touch")) {
      el = el.parentElement;
    }
    const sign = el.classList.value.includes("to-next") ? 1 : -1;

    moveTo(sign);
  };

  /* Handling of the onKeyDown event */
  const handleKeyDown = (ev) => {
    if (ev.keyCode === 37) {
      moveTo(-1);
    } else if (ev.keyCode === 39) {
      moveTo(1);
    }
  };

  useEffect(() => {
    writeInClipboard(data[indexItem]);
  }, []);

  useEffect(() => {
    const fetchData = async (url) => {
      return await fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((res) => {
          if (res.ok) {
            return res.blob();
          } else if (res.status === 404 || res.status === 402) {
            console.log("Not found");
          }
        })
        .catch(() => {
          console.log("Connection error");
        });
    };
    const url = URLFromSize(item);

    if (!desktop) {
      fetchData(url)
        .then((data) => {
          if (data) {
            setPdfContent(data);
          } else if (url === item.url2) {
            // If there is no data, let's try form the backup
            fetchData(item.url2).then((data) => setPdfContent(data));
          }
        })
        .catch(() => {
          // Call on error needed to recover the cache (if exist) of the backup
          fetchData(item.url2).then((data) => setPdfContent(data));
        });
    } else {
      setPdfContent(
        pdfFiles.filter((file) => file.name.includes(item.title))[0]
      );
    }
  }, [URLFromSize, desktop, item, pdfFiles]);

  return (
    // ref, tabIndex are necessary to make use of onKeyDown
    <div ref={ref} tabIndex="-1" onKeyDown={handleKeyDown}>
      <div
        className="horizontal align-items-center padding-left upper-tags"
        style={{ justifyContent: "space-between", paddingBottom: "1.5vh" }}
      >
        <div className="horizontal align-items-center min-height-1em">
          {!!item.tags && <FaTag className="news-item-tag " />}
          <Tags tags={item.tags} type="1" />
        </div>
        <a
          href={item.url2}
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

        {!!item.url && !!pdfContent && (
          <ErrorBoundary>
            <PDFDocument url={pdfContent} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
};

export default Post;
