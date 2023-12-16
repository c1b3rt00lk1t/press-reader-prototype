import { LanguageContextProvider } from "../contexts/LanguageContext";
import React from "react";

export const withLanguageContext = (component) => {
  return <LanguageContextProvider>{component}</LanguageContextProvider>;
};
