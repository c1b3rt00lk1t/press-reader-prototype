import React, { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";

import NewsList from "../components/NewsList";
import Offline from "../components/Offline";
import PressReaderContext from "../contexts/PressReaderContext";

const Main = () => {
  const {texts, language} = useContext(LanguageContext)
  const {sessionListSorted} = useContext(PressReaderContext)
  console.log(sessionListSorted)
  return (
    <>
      <div className="no-footer">
        <Offline />
        <h1>{texts[language].main.title}</h1>
        <p>{sessionListSorted.toString()}</p>
        <NewsList texts={texts} language={language}/>
      </div>
    </>
  );
};

export default Main;
