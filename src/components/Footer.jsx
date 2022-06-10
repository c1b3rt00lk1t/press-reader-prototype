import React from "react";
import { Link } from "react-router-dom";

import {
  IoMdSettings,
  IoMdEye,
  IoMdShareAlt,
  IoMdSearch,
} from "react-icons/io";

const Footer = () => {
  return (
    <footer>
      <Link to="/search">
        <IoMdSearch className="footer-icon" />
      </Link>
      <Link to="/">
        <IoMdEye className="footer-icon" />
      </Link>
      <Link to="/share">
        <IoMdShareAlt className="footer-icon" />
      </Link>
      <Link to="/settings">
        <IoMdSettings className="footer-icon" />
      </Link>
    </footer>
  );
};

export default Footer;
