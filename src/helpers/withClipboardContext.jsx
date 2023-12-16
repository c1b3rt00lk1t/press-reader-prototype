import { ClipboardContextProvider } from "../contexts/ClipboardContext";
import React from "react";

export const withClipboardContext = (component) => {
  return <ClipboardContextProvider>{component}</ClipboardContextProvider>;
};
