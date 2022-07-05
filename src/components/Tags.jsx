import React from 'react'

const Tags = ({tags}) => {
  return (
    <div className='tags line-clamp-1 max-vw-tags'>{!!tags && tags.map(a => a.toUpperCase()).sort().filter((a,i,arr) => a !== arr[i-1]).join(' , ')}</div>
  )
}

export default Tags