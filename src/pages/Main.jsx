import React from "react";

import NewsList from "../components/NewsList";
import Offline from "../components/Offline";

const Main = () => {

  return (
    <>
      <div className="no-footer">
        <Offline />
        <h1>Reader</h1>
        <NewsList />
      </div>
    </>
  );
};

export default Main;
