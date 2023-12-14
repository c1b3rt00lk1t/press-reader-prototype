import React from "react";
import PropTypes from "prop-types";

const SearchTime = ({ selectStartDate, selectEndDate, filter, texts }) => {
  return (
    <fieldset>
      <legend>{texts.range}</legend>
      <div className="horizontal justify-items-space-around ">
        <div className="horizontal justify-items-space-around vw-35">
          <label htmlFor="start-date">{texts.start}</label>
          <input
            onChange={selectStartDate}
            name="start-date"
            type="date"
            value={filter.startDate}
          />
        </div>
        <div className="horizontal justify-items-space-around vw-35">
          <label htmlFor="end-date">{texts.end}</label>
          <input
            onChange={selectEndDate}
            name="end-date"
            type="date"
            value={filter.endDate}
          />
        </div>
      </div>
    </fieldset>
  );
};

SearchTime.propTypes = {
  selectStartDate: PropTypes.func.isRequired,
  selectEndDate: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  texts: PropTypes.object.isRequired,
};

export default SearchTime;
