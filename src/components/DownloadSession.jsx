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
          <BsArrowDownCircle className="download-icon download-icon-margin" />
        )}
        {downloadProgress === "downloading" && (
          <BiLoaderCircle className="download-icon rotate download-icon-margin" />
        )}
        {downloadProgress === "completed" && (
          <BsCheckCircle className="download-icon download-icon-margin" />
        )}
        {downloadProgress === "error" && (
          <BsXCircle className="download-icon download-icon-margin" />
        )}

        <div onClick={fetchData}> {texts.fetchLastSession}</div>
      </div>
      <span>{texts.lastFetched}: {lastSessionFetched}</span>
    </div>
  );
};

export default DownloadSession;
