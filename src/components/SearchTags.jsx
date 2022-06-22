import React from 'react'

const SearchTags = ({title, filter, selectOR, uniqueList, selectAND}) => {
  return (
    <fieldset>
    <legend>{title}</legend>
    <div className="horizontal justify-items-space-around ">
      <div className="vw-35  horizontal justify-items-space-around  ">
        <label htmlFor="zone">OR</label>
        <select
          onChange={selectOR}
          name="zone"
          id="zone"
          multiple
          value={filter.zonesOR}
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
        <label htmlFor="zone">AND</label>
        <select
          onChange={selectAND}
          name="zone"
          id="zone"
          multiple
          value={filter.zonesAND}
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

  )
}

export default SearchTags