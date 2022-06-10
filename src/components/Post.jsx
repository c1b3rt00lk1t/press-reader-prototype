import React from "react";
import { useParams } from "react-router-dom";

const Post = ({data}) => {
  const params = useParams();
  console.log(data.filter(a => `${a.id}` === params.id))
  console.log(typeof(params.id))
  return (
    <div>
      {/* <h1>Post {params.id}</h1> */}
      {/* <p>{data[params.id].title}</p> */}
      <p>{data.filter(a => `${a.id}` === params.id).map(a => a.title)}</p>
    </div>
  );
};

export default Post;
