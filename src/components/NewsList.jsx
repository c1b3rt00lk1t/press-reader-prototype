import React from "react";

const NewsList = ({ data }) => {
  return (
    <>
      <ul>
        {data.map((d) => (
          <li key={d.id}>{d.title}</li>
        ))}
      </ul>
    </>
  );
};

export default NewsList;
