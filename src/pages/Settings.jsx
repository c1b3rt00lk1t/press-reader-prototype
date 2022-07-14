import React, { useContext } from "react";
import Offline from "../components/Offline";
import PressReaderContext from "../contexts/PressReaderContext";
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

    // fetchOnlyUpTo,
    // setFetchOnlyUpTo,
    URLFromSize,
  } = useContext(PressReaderContext);

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

  return (
    <div className="no-footer">
      <Offline />
      <h1>Settings</h1>
      <p style={{ fontSize: "0.8em" }}>Prototype: v1.4.4</p>
      <div
        className="vertical justify-items-space-between"
        style={{ height: "65vh" }}
      >
        <div style={{ marginLeft: "2vw" }}>
          <SettingToogle
            setter={setFetchLastSessionOnce}
            state={fetchLastSessionOnce}
            local="fetchLastSessionOnce"
            text="Always prefetch last session once"
            setExclude={setFetchLastSession}
            localExclude="fetchLastSession"
            disable={desktop}
          />
          <SettingToogle
            setter={setFetchLastSession}
            state={fetchLastSession}
            local="fetchLastSession"
            text="Always prefetch last session"
            setExclude={setFetchLastSessionOnce}
            localExclude="fetchLastSessionOnce"
            disable={desktop}
          />
          <SettingToogle
            setter={setFetchOnSubmit}
            state={fetchOnSubmit}
            local="fetchOnSubmit"
            text="Prefetch on Submit"
            disable={desktop}
          />
          <SettingToogle
            setter={setDesktop}
            state={desktop}
            local="desktop"
            text="Desktop"
            onlyWiderScreen={true}
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
