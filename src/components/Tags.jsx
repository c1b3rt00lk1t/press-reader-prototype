import React from "react";
import PropTypes from "prop-types";

const Tags = ({ tags, type, marginRight }) => {
  return (
    <div
      className={`tags line-clamp-1 max-vw-tags-${type} ${
        marginRight && "margin-right-tag"
      }`}
    >
      {!!tags &&
        tags
          .map((a) => a.toUpperCase())
          .sort()
          .filter((a, i, arr) => a !== arr[i - 1])
          .join(" , ")}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.array,
  type: PropTypes.string.isRequired,
  marginRight: PropTypes.bool,
};

export default Tags;
