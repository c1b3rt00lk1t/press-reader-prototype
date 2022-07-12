import React, { useContext, useState } from "react";
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
    fetchOnlyUpTo,
    setFetchOnlyUpTo,
  } = useContext(PressReaderContext);

  const [downloadProgress, setDownLoadProgress] = useState("pending");

  // Check that to not exceed th MAX chache
  const fetchData = async () => {
    setDownLoadProgress("downloading");
    const lastSession = uniqueSessions[0];
    try {
      const result = await Promise.all(
        dataOrdered
          .filter((file) => file.session === lastSession)
          .map((file) =>
            fetch(file.url, {
              method: "GET",
              mode: "cors",
            })
          )
      );
      console.log(result);
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
      <p style={{ fontSize: "0.8em" }}>Prototype: v1.2.3</p>
      <div
        className="vertical justify-items-space-between"
        style={{ height: "70vh" }}
      >
        <div style={{ marginLeft:"2vw" }}>
          <SettingToogle
            setter={setFetchLastSessionOnce}
            state={fetchLastSessionOnce}
            local="fetchLastSessionOnce"
            text="Always prefetch last session once"
            setExclude={setFetchLastSession}
            localExclude="fetchLastSession"
          />
          <SettingToogle
            setter={setFetchLastSession}
            state={fetchLastSession}
            local="fetchLastSession"
            text="Always prefetch last session"
            setExclude={setFetchLastSessionOnce}
            localExclude="fetchLastSessionOnce"

          />
          <SettingToogle
            setter={setFetchOnSubmit}
            state={fetchOnSubmit}
            local="fetchOnSubmit"
            text="Prefetch on Submit"
          />
          <SettingToogle
            setter={setFetchOnlyUpTo}
            state={fetchOnlyUpTo}
            local="fetchOnlyUpTo"
            text="Prefetch only < 1MB"
          />
        </div>
        <DownloadSession
          fetchData={fetchData}
          lastSessionFetched={lastSessionFetched}
          downloadProgress={downloadProgress}
        />
      </div>
    </div>
  );
};

export default Settings;
