import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PressReaderContext from "../contexts/PressReaderContext";

import {
  IoMdSettings,
  IoMdEye,
  IoMdShareAlt,
  IoMdSearch,
} from "react-icons/io";

const Footer = () => {
  const { handleShare, handleList } = useContext(PressReaderContext);

  return (
    <footer>
      <Link
        aria-label="footer-search"
        onClick={() => {
          document.getElementsByTagName("meta").viewport.content =
            "width=device-width, initial-scale=1, maximum-scale=1";
        }}
        to="/search"
      >
        <IoMdSearch className="footer-icon" />
      </Link>
      <Link
        aria-label="footer-list"
        onClick={() => {
          document.getElementsByTagName("meta").viewport.content =
            "width=device-width, initial-scale=1";
          handleList();
        }}
        to="/"
      >
        <IoMdEye className="footer-icon" />
      </Link>
      <div onClick={handleShare} aria-label="footer-share">
        <IoMdShareAlt className="footer-icon" />
      </div>
      <Link to="/settings" aria-label="footer-settings">
        <IoMdSettings className="footer-icon" />
      </Link>
    </footer>
  );
};

export default Footer;
