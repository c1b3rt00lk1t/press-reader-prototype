import React from 'react'

const SearchTime = ({selectSession,selectStartDate,selectEndDate,filter,uniqueSessions}) => {
  return (
    <fieldset>
    <legend>Time</legend>
    <div className="horizontal justify-items-space-around ">
      <div className="horizontal justify-items-space-around vw-35">
        <label htmlFor="session">Session</label>
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

      <div className="vertical">
        <div className="horizontal justify-items-space-around vw-35">
          <label htmlFor="start-date">Start</label>
          <input
            onChange={selectStartDate}
            name="start-date"
            type="date"
            value={filter.startDate}
          />
        </div>
        <div className="horizontal justify-items-space-around ">
          <label htmlFor="end-date">End</label>
          <input
            onChange={selectEndDate}
            name="end-date"
            type="date"
            value={filter.endDate}
          />
        </div>
      </div>
    </div>
  </fieldset>

  )
}

export default SearchTime