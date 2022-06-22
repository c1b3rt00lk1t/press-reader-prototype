import React from 'react'

const SearchTags = ({title, type, filter, selectOR, uniqueList, selectAND}) => {
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
          value={filter[type+'OR']}
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
          value={filter[type+'AND']}
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