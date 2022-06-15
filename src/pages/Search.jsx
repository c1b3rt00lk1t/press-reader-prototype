import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";

const Search = () => {
  const { uniqueSessions, uniqueZones } = useContext(PressReaderContext);

  return (
    <>
      <h1>Search</h1>
      <form action="#">
        <fieldset className="horizontal justify-items-space-around">
          <div>
            <div className="horizontal justify-items-space-between vw-35">
              <label htmlFor="session">Session</label>
              <select name="sessions" id="session">
                <option value="all">all</option>
                {uniqueSessions.map((session) => (
                  <option key={+session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="vertical">
            <div className="horizontal justify-items-space-around vw-50">
              <label htmlFor="start-date">Start date</label>
              <input name="start-date" type="date" />
            </div>
            <div className="horizontal justify-items-space-around ">
              <label htmlFor="end-date">End date</label>
              <input name="end-date" type="date" />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="horizontal justify-items-space-between vw-35">
            <label htmlFor="zone">Zone</label>
            <select name="zone" id="zone" multiple>
              <option value="all">all</option>
              {uniqueZones.map((session, i) => (
                <option key={+i} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Search;
