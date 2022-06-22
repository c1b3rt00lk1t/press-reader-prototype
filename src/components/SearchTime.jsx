import React from 'react'

const SearchTime = ({selectSession,selectStartDate,selectEndDate,filter,uniqueSessions}) => {
  return (
    <fieldset>
    <legend>Range</legend>
      <div className="horizontal justify-items-space-around ">
        <div className="horizontal justify-items-space-around vw-35">
          <label htmlFor="start-date">Start</label>
          <input
            onChange={selectStartDate}
            name="start-date"
            type="date"
            value={filter.startDate}
          />
        </div>
        <div className="horizontal justify-items-space-around w-35">
          <label htmlFor="end-date">End</label>
          <input
            onChange={selectEndDate}
            name="end-date"
            type="date"
            value={filter.endDate}
          />
        </div>
      </div>

  </fieldset>

  )
}

export default SearchTime