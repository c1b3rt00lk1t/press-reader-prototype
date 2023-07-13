import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Warning.module.css";

const Warning = ({text, linkto}) => {

  return (
    <Link className={styles.warningLink} to={`/${linkto}`}>
    <div className={styles.warningMessage}>{text}</div>
    </Link>
  )
}

export default Warning