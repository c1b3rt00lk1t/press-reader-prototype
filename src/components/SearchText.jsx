import React from "react";
import PropTypes from "prop-types";

const SearchText = ({ handleTextChange, filter, title }) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      <input type="text" onChange={handleTextChange} value={filter.text} />
    </fieldset>
  );
};
SearchText.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchText;
