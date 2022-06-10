import React from "react";
import { useParams } from "react-router-dom";
import { FaTag, FaIndustry, FaLocationArrow } from "react-icons/fa";
import Tags from "./Tags";

const Post = ({ data }) => {
  const params = useParams();
  const item = data.filter((a) => `${a.id}` === params.id)[0];

  return (
    <>
      <div
        className="horizontal align-items-center margin-lines"
        style={{ justifyContent: "space-between" , marginBottom: "1vh"}}
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
      <div>
        {!!item.url && (
          <embed
            src={item.url}
            style={{ margin: "-2.5vw", width: "100vw", height: "95vh", paddingBottom: "5vh" }}
            type="application/pdf"
          ></embed>
        )}
      </div>
    </>
  );
};

export default Post;
