import React from "react";
import { Link } from "react-router-dom";
import styles from "./Warning.module.css";
import PropTypes from "prop-types";

const Warning = ({ text, linkto }) => {
  return (
    <Link className={styles.warningLink} to={`/${linkto}`}>
      <div className={styles.warningMessage}>{text}</div>
    </Link>
  );
};

Warning.propTypes = {
  text: PropTypes.string.isRequired,
  linkto: PropTypes.string.isRequired,
};

export default Warning;
