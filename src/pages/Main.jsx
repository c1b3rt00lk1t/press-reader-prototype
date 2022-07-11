import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import NewsList from "../components/NewsList";

const Main = () => {
  const {
    connected
  } = useContext(PressReaderContext);
  return (
    <>
      <div className="no-footer">
      {!connected && <div className="connected">offline mode</div>}
        <h1>Reader</h1>
        <NewsList />
      </div>
    </>
  );
};

export default Main;
