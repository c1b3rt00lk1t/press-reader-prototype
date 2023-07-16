import React from "react";
import { BsArrowDownCircle, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";

const DownloadSession = ({
  fetchData,
  lastSessionFetched,
  downloadProgress,
  texts,
}) => {
  // downloadProgress = "error";
  return (
    <div className="horizontal justify-items-space-around">
      <div className="horizontal  align-items-center">
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

        <div onClick={fetchData}> {texts.fetchLastSession}</div>
      </div>
      <span>{texts.lastFetched}: {lastSessionFetched}</span>
    </div>
  );
};

export default DownloadSession;
