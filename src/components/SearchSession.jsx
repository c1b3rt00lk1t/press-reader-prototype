import React from "react";
import PropTypes from "prop-types";

const SearchSession = ({ selectSession, filter, uniqueSessions, title }) => {
  return (
    <fieldset>
      <legend>{title}</legend>

      <div className="horizontal justify-items-space-around vw-35">
        <label htmlFor="session">{title}</label>
        <select
          onChange={selectSession}
          name="sessions"
          id="session"
          multiple
          value={filter.session}
        >
          <option value="all">all</option>
          {uniqueSessions.map((session, i) => (
            <option key={+session + i} value={session}>
              {session}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

SearchSession.propTypes = {
  selectSession: PropTypes.func.isRequired,
  filter: PropTypes.object.isRequired,
  uniqueSessions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default SearchSession;
