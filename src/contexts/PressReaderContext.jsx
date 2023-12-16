import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import React from "react";
import {
  checkConnectionFromDB,
  getDataFromDBSessionList,
  getDataFromDBOneSession,
  getDataFromDBDictionary,
} from "../firebase.js";
import LanguageContext from "../contexts/LanguageContext";
import { set as setIdb, get as getIdb } from "../indexedDB/indexedDB.js";
import PropsTypes from "prop-types";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {
  const { texts, language } = useContext(LanguageContext);

  const [connected, setConnected] = useState(true);
  const [dataAll, setDataAll] = useState([]);
  const [sessionListSorted, setSessionListSorted] = useState([]);
  const [sessionURLsSorted, setSessionURLsSorted] = useState([]);
  const [sessionListDownloaded, setSessionListDownloaded] = useState([]);
  const [sessionLastInLocalStorage, setSessionLastInLocalStorage] = useState();

  const [uniqueSessions, setUniqueSessions] = useState([]);
  const [uniqueZones, setUniqueZones] = useState([]);
  const [uniqueIndustries, setUniqueIndustries] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);

  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataOrdered, setDataOrdered] = useState([]);

  const [filter, setFilter] = useState({
    session: ["all"],
    startDate: "",
    endDate: "",
    zonesOR: ["all"],
    zonesAND: ["any"],
    sectorsOR: ["all"],
    sectorsAND: ["any"],
    tagsOR: ["all"],
    tagsAND: ["any"],
    text: "",
  });

  /** CONTEXT FOR PREFETCH */

  const [fetchLastSession, setFetchLastSession] = useState(
    window.localStorage.getItem("PrRe_fetchLastSession") === "true" || false
  );
  const [fetchLastSessionOnce, setFetchLastSessionOnce] = useState(
    window.localStorage.getItem("PrRe_fetchLastSessionOnce") === "true" || false
  );
  const [fetchOnSubmit, setFetchOnSubmit] = useState(
    window.localStorage.getItem("PrRe_fetchOnSubmit") === "true" || false
  );
  const [submit, setSubmit] = useState(false);

  const [downloadProgress, setDownLoadProgress] = useState("pending");
  const [lastSessionFetched, setLastSessionFetched] = useState(
    window.localStorage.getItem("PrRe_lastSessionFetched") || "00000000"
  );

  const [desktop, setDesktop] = useState(
    window.localStorage.getItem("PrRe_desktop") === "true" || false
  );

  const [pdfFiles, setPdfFiles] = useState([]);
  // const [relativePath, setRelativePath] = useState([]);

  const handleSelectFolder = (ev) => {
    const filesArray = [...ev.target.files];
    setSessionListDownloaded([
      ...new Set(
        filesArray
          .map((file) => file.webkitRelativePath.substring(14, 40))
          .filter((file) => file.startsWith("Revisión prensa"))
          .map(
            (folder) =>
              folder.slice(16, 20) + folder.slice(21, 23) + folder.slice(24, 26)
          )
      ),
    ]);
    setPdfFiles(filesArray.filter((file) => file.type === "application/pdf"));
  };

  /** CONTEXT FOR DICTIONARY */

  const [dictionary, setDictionary] = useState(
    JSON.parse(window.localStorage.getItem("PrRe_dictionary") || "{}")
  );

  useEffect(() => {
    const handleGetDictionaryFromDB = () => {
      const handleDataFromDB = (data) => {
        window.localStorage.setItem("PrRe_dictionary", JSON.stringify(data));
        setDictionary(data);
      };
      getDataFromDBDictionary(handleDataFromDB);
    };

    handleGetDictionaryFromDB();
  }, []);

  const [flatItems, setFlatItems] = useState({});

  useEffect(() => {
    if (!dictionary.zones || !dictionary.tags || !dictionary.sectors) return;

    // temp variables for destructring any of the three trees
    const zones = [];
    const sectors = [];
    const tags = [];

    // generic recursive function for destructring any of the three trees
    const destructureItems = (target) => (path) => (object) => {
      if (!object || typeof object !== "object") {
        // Handle the case when object is not a valid object
        return [];
      }

      for (let [prop, value] of Object.entries(object)) {
        if (typeof value === "object") {
          // `${path}/${prop}` is kept in order to unfold also the target subfolder
          // to avoid this behavior and be more restrictive with unfolding, the /${prop} could be removed
          target.push({ item: prop, path: `${path}/${prop}` });
          destructureItems(target)(`${path}/${prop}`)(value);
        } else if (typeof value === "boolean") {
          target.push({ item: prop, path: `${path}` });
        }
      }
      return target;
    };

    // the result of the calculation is stored in the corresponding states
    const flatZones = destructureItems(zones)("zones")(dictionary.zones);
    const flatSectors = destructureItems(sectors)("sectors")(
      dictionary.sectors
    );
    const flatTags = destructureItems(tags)("tags")(dictionary.tags);

    setFlatItems({ flatZones, flatSectors, flatTags });
  }, [dictionary.sectors, dictionary.tags, dictionary.zones]);

  //returns an array of all subnodes of the target nodes provided via an array
  const flatDictionary = (type) => (targets) => {
    return targets.reduce((acc, target) => {
      return acc.concat(
        flatItems[type]
          .filter((zone) => zone.path.includes(`/${target}`))
          .map((zone) => zone.item)
      );
    }, []);
  };

  const flatDictionaryZones = flatDictionary("flatZones");
  const flatDictionarySectors = flatDictionary("flatSectors");
  const flatDictionaryTags = flatDictionary("flatTags");

  /** CONTEXT FOR SEARCH */

  const [orderType, setOrderType] = useState("sessionOrder");

  // Functions to handle the onChange events in the Form
  const selectSession = (e) => {
    setFilter({
      ...filter,
      session: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectStartDate = (e) => {
    setFilter({ ...filter, startDate: e.target.value });
  };

  const selectEndDate = (e) => {
    setFilter({ ...filter, endDate: e.target.value });
  };

  const selectZonesOR = (e) => {
    setFilter({
      ...filter,
      zonesOR: [
        ...[...e.target.selectedOptions].map((a) => a.value),
        // expands the filter to all subtrees
        ...flatDictionaryZones(
          [...e.target.selectedOptions].map((option) => option.label)
        ),
      ],
    });
  };

  const selectZonesAND = (e) => {
    setFilter({
      ...filter,
      zonesAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectSectorsOR = (e) => {
    setFilter({
      ...filter,
      sectorsOR: [
        ...[...e.target.selectedOptions].map((a) => a.value),
        // expands the filter to all subtrees
        ...flatDictionarySectors(
          [...e.target.selectedOptions].map((option) => option.label)
        ),
      ],
    });
  };

  const selectSectorsAND = (e) => {
    setFilter({
      ...filter,
      sectorsAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const selectTagsOR = (e) => {
    setFilter({
      ...filter,
      tagsOR: [
        ...[...e.target.selectedOptions].map((a) => a.value),
        // expands the filter to all subtrees
        ...flatDictionaryTags(
          [...e.target.selectedOptions].map((option) => option.label)
        ),
      ],
    });
  };

  const selectTagsAND = (e) => {
    setFilter({
      ...filter,
      tagsAND: [...e.target.selectedOptions].map((a) => a.value),
    });
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setFilter({ ...filter, text: e.target.value });
  };

  // Logic of the filter
  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((g, f) => f(g), x);

  const trace = (value) => {
    // console.log("trace", value);
    return value;
  };
  const applyFilters = useCallback(
    (data, selection) => {
      const applySessionFilter = ({ data, selection }) => {
        const filtered = data.filter((a) =>
          !selection.session.includes("all")
            ? selection.session.includes(a.session)
            : true
        );
        return { filtered, selection };
      };

      const applyTimeRangeFilter = ({ filtered: data, selection }) => {
        const startDate = selection.startDate
          ? selection.startDate.replace(/-/g, "")
          : "00000000";
        const endDate = selection.endDate
          ? selection.endDate.replace(/-/g, "")
          : "99991231";

        const filtered = data.filter(
          (a) => a.date >= startDate && a.date <= endDate
        );
        return { filtered, selection };
      };

      const logicFilter = (item, selection, target, type) => {
        const prop = target + type;

        if (type === "AND") {
          for (let a of selection[prop]) {
            if (a === "any") {
              return true;
            } else if (!item[target] || item[target].indexOf(a) < 0) {
              return false;
            }
          }
          return true;
        } else if (type === "OR") {
          for (let a of selection[prop]) {
            if (a === "all") {
              return true;
            } else if (!!item[target] && item[target].indexOf(a) >= 0) {
              return true;
            }
          }
          return false;
        }
      };

      const applyZoneFilter = ({ filtered: data, selection }) => {
        const filtered = data
          .filter((item) => logicFilter(item, selection, "zones", "OR"))
          .filter((item) => logicFilter(item, selection, "zones", "AND"));
        return { filtered, selection };
      };

      const applySectorFilter = ({ filtered: data, selection }) => {
        const filtered = data
          .filter((item) => logicFilter(item, selection, "sectors", "OR"))
          .filter((item) => logicFilter(item, selection, "sectors", "AND"));
        return { filtered, selection };
      };

      const applyTagsFilter = ({ filtered: data, selection }) => {
        const filtered = data
          .filter((item) => logicFilter(item, selection, "tags", "OR"))
          .filter((item) => logicFilter(item, selection, "tags", "AND"));
        return { filtered, selection };
      };

      const applyTextFilter = ({ filtered: data, selection }) => {
        const checkText = (item, texts) => {
          const result = texts.reduce(
            (acc, b) =>
              acc &&
              (item.title.toLowerCase().includes(b) ||
                (!!item.zones && item.zones.includes(b)) ||
                (!!item.sectors && item.sectors.includes(b)) ||
                (!!item.tags && item.tags.includes(b)) ||
                (!!item.source && item.source.toLowerCase().includes(b))),
            true
          );

          return result;
        };
        const filtered = data.filter((item) =>
          checkText(item, selection.text.toLowerCase().split(" "))
        );
        return { filtered, selection };
      };

      const applyOrder = ({ filtered: data, selection }) => {
        if (orderType === "sessionOrder") {
          const filtered = data.sort(
            (a, b) =>
              parseInt(a.session + String(a.order).padStart(4, "0")) -
              parseInt(b.session + String(b.order).padStart(4, "0"))
          );
          return { filtered, selection };
        } else if (orderType === "dateOrderAsc") {
          const filtered = data.sort(
            (a, b) =>
              parseInt(a.date.replace(/-/g, "")) -
              parseInt(b.date.replace(/-/g, ""))
          );
          return { filtered, selection };
        } else if (orderType === "dateOrderDesc") {
          const filtered = data.sort(
            (a, b) =>
              parseInt(b.date.replace(/-/g, "")) -
              parseInt(a.date.replace(/-/g, ""))
          );
          return { filtered, selection };
        }
      };

      const { filtered } = compose(
        trace,
        applyOrder,
        applyTextFilter,
        // trace,
        applyTagsFilter,
        applySectorFilter,
        applyZoneFilter,
        applyTimeRangeFilter,
        applySessionFilter
      )({ data, selection });
      setDataFiltered(filtered);
      setDataOrdered(filtered);
    },
    [orderType]
  );

  // Functions for the buttons
  const handleReset = (e) => {
    e.preventDefault();

    [...document.getElementsByTagName("select")].map((a) => (a.value = ""));
    [...document.getElementsByTagName("input")].map((a) => (a.value = ""));

    setFilter({
      session: ["all"],
      startDate: "",
      endDate: "",
      zonesOR: ["all"],
      zonesAND: ["any"],
      sectorsOR: ["all"],
      sectorsAND: ["any"],
      tagsOR: ["all"],
      tagsAND: ["any"],
      text: "",
    });
    applyFilters(dataAll, filter);
  };

  /** CONTEXT FOR MAIN */

  const handleDataFromDBOneSession = async (data) => {
    try {
      await setIdb(
        "PrReSessionList",
        `PrRe_data_${data[0].session}`,
        JSON.stringify(data)
      );
    } catch (error) {
      console.log(`Error trying to set PrRe_data_${data[0].session}: ${error}`);
    }
    setSessionLastInLocalStorage(data[0].session);
  };

  const handleDataFromDBSessions = useCallback(
    (data) => {
      // // The object is transformed into an Array and flattened, so that the first level of properties disappears
      const dataFlat = Object.keys(data).flatMap(function (key) {
        return data[key];
      });

      // The states derived from the data are set
      setDataAll(dataFlat);

      setUniqueSessions(
        dataFlat
          .map((a) => a.session)
          .sort((a, b) => b - a)
          .filter((a, i, arr) => a !== arr[i - 1])
      );
      setUniqueZones(
        dataFlat
          .flatMap((a) => a.zones)
          .sort()
          .filter((a, i, arr) => a !== arr[i - 1])
      );
      setUniqueIndustries(
        dataFlat
          .flatMap((a) => a.sectors)
          .sort()
          .filter((a, i, arr) => a !== arr[i - 1])
      );
      setUniqueTags(
        dataFlat
          .flatMap((a) => a.tags)
          .sort()
          .filter((a, i, arr) => a !== arr[i - 1])
      );

      applyFilters(dataFlat, filter);
    },
    [applyFilters, filter]
  );

  const handleDataFromDBSessionList = useCallback(async (data) => {
    // Receives an object
    const sessionList = Object.keys(data).sort((a, b) => b - a);

    // // Stores the session list in indexedDB
    await setIdb("PrReSessionList", "PrRe_data", sessionList.join(","));

    // // Order session list
    setSessionListSorted(sessionList);
    setSessionURLsSorted(
      Object.entries(data).sort((a, b) => (+a[0] < +b[0] ? 1 : -1))
    );
  }, []);

  const URLFromSize = useCallback((file) => {
    const url = file.size < 500000 ? file.url : file.url2;
    return url;
  }, []);

  /** USE EFFECTS */
  useEffect(() => {
    checkConnectionFromDB(setConnected);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const sessionList = await getIdb("PrReSessionList", "PrRe_data");
      if (sessionList) {
        const sessionsInStorage = await Promise.all(
          sessionList
            .split(",")
            .map(async (session) =>
              JSON.parse(
                (await getIdb("PrReSessionList", `PrRe_data_${session}`)) ||
                  "{}"
              )
            )
        );

        handleDataFromDBSessions(
          sessionsInStorage.filter((session) => session.length)
        );
      }
    }
    fetchData();
  }, [connected, handleDataFromDBSessions, sessionLastInLocalStorage]);

  useEffect(() => {
    getDataFromDBSessionList(handleDataFromDBSessionList);
  }, [handleDataFromDBSessionList]);

  useEffect(() => {
    sessionListSorted.forEach((session) =>
      localStorage.removeItem(`PrRe_data_${session}`)
    );
    localStorage.removeItem(`PrRe_data`);
    sessionListSorted.forEach((session) =>
      getDataFromDBOneSession(session)(handleDataFromDBOneSession)
    );
  }, [sessionListSorted]);

  // Prefetch according to user's preferences
  useEffect(() => {
    const fetchData = async (lastSession) => {
      if (lastSession) {
        setDownLoadProgress("downloading");
      }
      try {
        await Promise.all(
          dataOrdered
            .filter((file) => !lastSession || file.session === lastSession)
            .filter((file) => file.size < 2000000)
            .slice(0, 251)
            .map((file) =>
              fetch(URLFromSize(file), {
                method: "GET",
                mode: "cors",
              })
            )
        );
        if (lastSession) {
          setLastSessionFetched(lastSession);
          window.localStorage.setItem("PrRe_lastSessionFetched", lastSession);
          setDownLoadProgress("completed");
        }
      } catch (error) {
        setDownLoadProgress("error");
        console.log("Connection error");
      }
    };

    if (fetchLastSession) {
      fetchData(uniqueSessions[0]);
      console.log("Fetch last session always.");
    } else if (fetchLastSessionOnce && lastSessionFetched < uniqueSessions[0]) {
      fetchData(uniqueSessions[0]);
      console.log("Fetch last session once.");
    } else if (fetchOnSubmit && submit) {
      fetchData();
      console.log("Fetch on submit.");
      setSubmit(false);
    }
  }, [
    dataOrdered,
    fetchLastSession,
    fetchLastSessionOnce,
    lastSessionFetched,
    uniqueSessions,
    fetchOnSubmit,
    submit,
    URLFromSize,
  ]);

  const [postSelected, setPostSelected] = useState(null);
  const [dataToShare, setDataToShare] = useState({
    title: "PressReader",
    text: texts[language].share.msg,
    url: "https://press-reader-demo.web.app/",
  });

  const handleList = () => {
    setDataToShare({
      title: "PressReader",
      text: texts[language].share.msg,
      url: "https://press-reader-demo.web.app/",
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share(dataToShare);
    } catch (err) {
      console.log("Error in the sharing process");
    }
  };

  return (
    <PressReaderContext.Provider
      value={{
        dataAll,
        uniqueSessions,
        uniqueZones,
        uniqueIndustries,
        uniqueTags,
        filter,
        setFilter,
        dataFiltered,
        setDataFiltered,
        dataOrdered,
        setDataOrdered,
        postSelected,
        setPostSelected,
        handleShare,
        setDataToShare,
        handleList,
        orderType,
        setOrderType,
        //// Search
        selectSession,
        selectStartDate,
        selectEndDate,
        selectZonesOR,
        selectZonesAND,
        selectSectorsOR,
        selectSectorsAND,
        selectTagsOR,
        selectTagsAND,
        handleTextChange,
        applyFilters,
        handleReset,
        setSubmit,
        connected,
        fetchLastSession,
        setFetchLastSession,
        lastSessionFetched,
        setLastSessionFetched,
        fetchOnSubmit,
        setFetchOnSubmit,
        fetchLastSessionOnce,
        setFetchLastSessionOnce,
        downloadProgress,
        setDownLoadProgress,
        desktop,
        setDesktop,
        URLFromSize,
        handleSelectFolder,
        pdfFiles,
        sessionListSorted,
        sessionURLsSorted,
        sessionListDownloaded,
      }}
    >
      {children}
    </PressReaderContext.Provider>
  );
};

PressReaderContextProvider.propTypes = {
  children: PropsTypes.node.isRequired,
};
export default PressReaderContext;
