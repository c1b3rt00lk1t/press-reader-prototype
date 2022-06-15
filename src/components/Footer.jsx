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

  const { handleShare } = useContext(PressReaderContext);

  return (
    <footer>
      <Link to="/search">
        <IoMdSearch className="footer-icon" />
      </Link>
      <Link to="/">
        <IoMdEye className="footer-icon" />
      </Link>
      <div onClick={handleShare}>
        <IoMdShareAlt className="footer-icon" />
      </div>
      <Link to="/settings">
        <IoMdSettings className="footer-icon" />
      </Link>
    </footer>
  );
};

export default Footer;
