import React from 'react'

const Tags = ({tags, type, marginRight}) => {
  return (
    <div className={`tags line-clamp-1 max-vw-tags-${type} ${marginRight && "margin-right-tag"}`}>{!!tags && tags.map(a => a.toUpperCase()).sort().filter((a,i,arr) => a !== arr[i-1]).join(' , ')}</div>
  )
}

export default Tags