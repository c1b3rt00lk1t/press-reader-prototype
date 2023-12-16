import { PressReaderContextProvider } from "../contexts/PressReaderContext";
import React from "react";

export const withPressReaderContext = (component) => {
  return <PressReaderContextProvider>{component}</PressReaderContextProvider>;
};
