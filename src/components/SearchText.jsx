import React from 'react'

const SearchText = ({handleTextChange, filter, title}) => {
  return (
    <fieldset>
          <legend>{title}</legend>
          <input type="text" onChange={handleTextChange} value={filter.text}/>
        </fieldset>
  )
}

export default SearchText