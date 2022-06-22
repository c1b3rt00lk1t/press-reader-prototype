import React from 'react'

const SearchText = ({handleTextChange}) => {
  return (
    <fieldset>
          <legend>Text</legend>
          <input type="text" onChange={handleTextChange} />
        </fieldset>
  )
}

export default SearchText