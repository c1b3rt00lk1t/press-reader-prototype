import React from "react";
import { useParams } from "react-router-dom";

const Post = ({ data }) => {
  const params = useParams();
  const item =data.filter((a) => `${a.id}` === params.id)[0];
  // const width = window.innerWidth;
  // const height = window.innerHeight;
  // console.log(width);
  // console.log(height);
  return (
    <div>
      {/* <h1>Post {params.id}</h1> */}
      {/* <p>{data[params.id].title}</p> */}
      <p>{item.title}</p>
      {!!item.url && <embed
        src={item.url}
        style={{width:'95vw',height:'80vh' }}
        type="application/pdf"
      ></embed>}
    </div>
  );
};

export default Post;
