import React from 'react'

const SearchTime = ({selectStartDate,selectEndDate,filter, texts}) => {
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

  )
}

export default SearchTime