import React from "react";
import { BsArrowDownCircle, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";


const DownloadSession = ({
  fetchData,
  lastSessionFetched,
  downloadProgress,
  
}) => {

    // downloadProgress = "error";
  return (
    <div className="horizontal justify-items-space-around">
      <div className="horizontal">
        {downloadProgress === "pending" && (
          <BsArrowDownCircle className="download-icon" />
        )}
        {downloadProgress === "downloading" && (
          <BiLoaderCircle className="download-icon rotate" />
        )}
        {downloadProgress === "completed" && (
          <BsCheckCircle className="download-icon" />
        )}
         {downloadProgress === "error" && (
          <BsXCircle className="download-icon" />
        )}

        <div onClick={fetchData}> Fetch last session</div>
      </div>
      <span>Last fetched: {lastSessionFetched}</span>
    </div>
  );
};

export default DownloadSession;
