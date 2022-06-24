import React from "react";
import NewsList from "../components/NewsList";

const Main = () => {
  return (
    <>
      <div className="no-footer">
        <h1>Reader</h1>
        <NewsList />
      </div>
    </>
  );
};

export default Main;
