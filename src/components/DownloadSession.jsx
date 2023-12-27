import React from "react";
import { BsArrowDownCircle, BsCheckCircle, BsXCircle } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import PropTypes from "prop-types";

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
          <BsArrowDownCircle className="download-pending download-icon download-icon-margin" />
        )}
        {downloadProgress === "downloading" && (
          <BiLoaderCircle className="download-downloading download-icon rotate download-icon-margin" />
        )}
        {downloadProgress === "completed" && (
          <BsCheckCircle className="download-completed download-icon download-icon-margin" />
        )}
        {downloadProgress === "error" && (
          <BsXCircle className="download-error download-icon download-icon-margin" />
        )}

        <div onClick={fetchData}> {texts.fetchLastSession}</div>
      </div>
      <span>
        {texts.lastFetched}: {lastSessionFetched}
      </span>
    </div>
  );
};

DownloadSession.propTypes = {
  fetchData: PropTypes.func.isRequired,
  lastSessionFetched: PropTypes.string.isRequired,
  downloadProgress: PropTypes.string.isRequired,
  texts: PropTypes.object.isRequired,
};

export default DownloadSession;
