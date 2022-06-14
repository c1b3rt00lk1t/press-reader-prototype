import React from "react";
import { Link } from "react-router-dom";

import {
  IoMdSettings,
  IoMdEye,
  IoMdShareAlt,
  IoMdSearch,
} from "react-icons/io";

const Footer = () => {
  const shareData = {
    title: "PressReader",
    text: 'Try this prototype!',
    url: "https://tourmaline-unicorn-2c62ec.netlify.app",
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error in the sharing process");
    }
  };

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
