import React, { useContext } from "react";
import LanguageContext from "../contexts/LanguageContext";
import PressReaderContext from "../contexts/PressReaderContext";

import NewsList from "../components/NewsList";
import Offline from "../components/Offline";
import Warning from "../components/Warning";

const Main = () => {
  const { texts, language } = useContext(LanguageContext);
  const { desktop, sessionListDownloaded } = useContext(PressReaderContext);

  return (
    <>
      <div className="no-footer">
        <Offline />
        <h1>{texts[language].main.title}</h1>
        {desktop && !sessionListDownloaded.length && (
          <Warning
            text={texts[language].main.warningDesktop}
            linkto="settings"
          />
        )}
        <NewsList texts={texts} language={language} />
      </div>
    </>
  );
};

export default Main;
