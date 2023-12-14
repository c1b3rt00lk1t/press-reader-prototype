import React from "react";
import PropTypes from "prop-types";

const SearchTags = ({
  title,
  type,
  filter,
  selectOR,
  uniqueList,
  selectAND,
}) => {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="horizontal justify-items-space-around ">
        <div className="vw-35  horizontal justify-items-space-around  ">
          <label htmlFor={title}>OR</label>
          <select
            onChange={selectOR}
            name={title}
            id={title}
            multiple
            value={filter[type + "OR"]}
          >
            <option value="all">all</option>
            {uniqueList.map((item, i) => (
              <option key={+i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="vw-35  horizontal justify-items-space-around  ">
          <label htmlFor={title}>AND</label>
          <select
            onChange={selectAND}
            name={title}
            id={title}
            multiple
            value={filter[type + "AND"]}
          >
            <option value="any">any</option>
            {uniqueList.map((item, i) => (
              <option key={+i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
};

SearchTags.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  filter: PropTypes.object.isRequired,
  selectOR: PropTypes.func.isRequired,
  uniqueList: PropTypes.array.isRequired,
  selectAND: PropTypes.func.isRequired,
};

export default SearchTags;
