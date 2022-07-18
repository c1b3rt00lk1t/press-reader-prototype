import React, { useContext } from "react";
import Offline from "../components/Offline";
import PressReaderContext from "../contexts/PressReaderContext";
import LanguageContext from "../contexts/LanguageContext";
import SettingToogle from "../components/SettingToogle";
import DownloadSession from "../components/DownloadSession";

const Settings = () => {
  const {
    dataOrdered,
    fetchLastSession,
    setFetchLastSession,
    fetchOnSubmit,
    setFetchOnSubmit,
    lastSessionFetched,
    uniqueSessions,
    setLastSessionFetched,
    fetchLastSessionOnce,
    setFetchLastSessionOnce,
    downloadProgress,
    setDownLoadProgress,
    setDesktop,
    desktop,
    handleSelectFolder,

    // fetchOnlyUpTo,
    // setFetchOnlyUpTo,
    URLFromSize,
  } = useContext(PressReaderContext);

  const { texts, language } = useContext(LanguageContext);

  // Check that to not exceed th MAX cache expiration plugin
  const fetchData = async () => {
    setDownLoadProgress("downloading");
    const lastSession = uniqueSessions[0];
    try {
      await Promise.all(
        dataOrdered
          .filter((file) => file.session === lastSession)
          .slice(0, 251)
          .filter((file) => file.size < 5000000)
          .map((file) =>
            fetch(URLFromSize(file), {
              method: "GET",
              mode: "cors",
            })
          )
      );
      setLastSessionFetched(lastSession);
      window.localStorage.setItem("PrRe_lastSessionFetched", lastSession);
      setDownLoadProgress("completed");
    } catch (error) {
      setDownLoadProgress("error");
      console.log("Connection error");
    }
  };

  const clickSelector = () => {
    // Resets the next states
    // Triggers the event
    document.getElementById("file-selector").click();
  };

  return (
    <div className="no-footer">
      <Offline />
      <h1>{texts[language].settings.title}</h1>
      <p style={{ fontSize: "0.8em" }}>
        {texts[language].settings.prototype}: v1.5.2
      </p>
      <div
        className="vertical justify-items-space-between"
        style={{ height: "65vh" }}
      >
        <div style={{ marginLeft: "2vw" }}>
          <SettingToogle
            setter={setFetchLastSessionOnce}
            state={fetchLastSessionOnce}
            local="fetchLastSessionOnce"
            text={texts[language].settings.prefetchOnce}
            setExclude={setFetchLastSession}
            localExclude="fetchLastSession"
            disable={desktop}
          />
          <SettingToogle
            setter={setFetchLastSession}
            state={fetchLastSession}
            local="fetchLastSession"
            text={texts[language].settings.prefetchAlways}
            setExclude={setFetchLastSessionOnce}
            localExclude="fetchLastSessionOnce"
            disable={desktop}
          />
          <SettingToogle
            setter={setFetchOnSubmit}
            state={fetchOnSubmit}
            local="fetchOnSubmit"
            text={texts[language].settings.prefetchOnSubmit}
            disable={desktop}
          />
          <SettingToogle
            setter={setDesktop}
            state={desktop}
            local="desktop"
            text={texts[language].settings.desktop}
            onlyWiderScreen={true}
            trigger={clickSelector}
          />
          <span id="selection-result" className="contador"></span>
          <input
            onChange={handleSelectFolder}
            type="file"
            id="file-selector"
            name="fileList"
            style={{ display: "none" }}
            webkitdirectory="true"
          />

          {/* <SettingToogle
            setter={setFetchOnlyUpTo}
            state={fetchOnlyUpTo}
            local="fetchOnlyUpTo"
            text="Prefetch only < 1MB"
          /> */}
        </div>
        {!desktop && (
          <DownloadSession
            texts={texts[language].settings}
            fetchData={fetchData}
            lastSessionFetched={lastSessionFetched}
            downloadProgress={downloadProgress}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
