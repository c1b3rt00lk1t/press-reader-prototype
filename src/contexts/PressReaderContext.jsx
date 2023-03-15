import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { getDataFromDBSessions, checkConnectionFromDB,getDataFromDBSessionList } from "../firebase";
import LanguageContext from "../contexts/LanguageContext";

// import { data } from "../data/data.js";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {

  const { texts, language } = useContext(LanguageContext);

  const [connected, setConnected] = useState(true);
  const [dataAll, setDataAll] = useState();

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
  /* If this feature is finally needed, the uploader has to provide the property to check*/
  // const [fetchOnlyUpTo, setFetchOnlyUpTo] = useState(
  //   !window.localStorage.getItem("PrRe_fetchOnlyUpTo")
  //     ? true
  //     : window.localStorage.getItem("PrRe_fetchOnlyUpTo") === "true"
  // );
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
    setPdfFiles(filesArray.filter((file) => file.type === "application/pdf"));

  };

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
      zonesOR: [...e.target.selectedOptions].map((a) => a.value),
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
      sectorsOR: [...e.target.selectedOptions].map((a) => a.value),
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
      tagsOR: [...e.target.selectedOptions].map((a) => a.value),
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

  // const trace = (value) => {
  //   console.log(value);
  //   return value;
  // };
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
        const startDate = !!selection.startDate
          ? selection.startDate.replace(/-/g, "")
          : "00000000";
        const endDate = !!selection.endDate
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


  const handleDataFromDBSessionList = useCallback(
    (data) => {
        data.sort((a,b) => b - a).forEach(a => console.log(a));
  },[]);

  const handleDataFromDBSessions = useCallback(
    (data) => {

      if (!navigator.userAgent.match(/safari/i)){
        window.localStorage.setItem("PrRe_data", JSON.stringify(data));
      }
      
      // The object is transformed into an Array and flattened, so that the first level of properties disappears
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

  const URLFromSize = useCallback((file) => {
    const url = file.size < 500000 ? file.url : file.url2;
    return url;
  }, []);

  /** USE EFFECTS */
  useEffect(() => {
    checkConnectionFromDB(setConnected);
  }, []);

  useEffect(() => {
    if (!connected && window.localStorage.getItem("PrRe_data")) {
      handleDataFromDBSessions(JSON.parse(window.localStorage.getItem("PrRe_data")));
    }
  }, [connected, handleDataFromDBSessions]);

  useEffect(() => {
    getDataFromDBSessions(handleDataFromDBSessions);
  }, [handleDataFromDBSessions]);

  useEffect(() => {
    getDataFromDBSessionList(handleDataFromDBSessionList);
  },[handleDataFromDBSessionList]);

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
    url: "https://tourmaline-unicorn-2c62ec.netlify.app",
  });

  const handleList = () => {
    setDataToShare({
      title: "PressReader",
      text: texts[language].share.msg,
      url: "https://tourmaline-unicorn-2c62ec.netlify.app",
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
        // fetchOnlyUpTo,
        // setFetchOnlyUpTo,
        URLFromSize,
        handleSelectFolder,
        pdfFiles
      }}
    >
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
