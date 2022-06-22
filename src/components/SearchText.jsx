import React from 'react'

const SearchText = ({handleTextChange, filter}) => {
  return (
    <fieldset>
          <legend>Text</legend>
          <input type="text" onChange={handleTextChange} value={filter.text}/>
        </fieldset>
  )
}

export default SearchText