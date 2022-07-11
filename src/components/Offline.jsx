import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";

const Offline = () => {
    const {
        connected
      } = useContext(PressReaderContext);
  return (
    <>
     {!connected && <div className="connected">offline</div>}
    </>  )
}

export default Offline