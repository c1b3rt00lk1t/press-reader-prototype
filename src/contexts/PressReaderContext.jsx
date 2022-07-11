import { createContext, useState, useEffect, useCallback } from "react";
import { getDataFromDB } from "../firebase";
// import { data } from "../data/data.js";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {
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
  const applyFilters = useCallback((data, selection) => {
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
            parseInt(a.session + String(a.order).padStart(4, '0')) - parseInt(b.session + String(b.order).padStart(4, '0'))
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
  }, [orderType]);

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

  useEffect(() => {
    const handleDataFromDB = (data) => {
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
      // setDataFiltered(dataFlat);
      // setDataOrdered(dataFlat);
    };
    getDataFromDB(handleDataFromDB);
  }, [applyFilters, filter]);

  const [postSelected, setPostSelected] = useState(null);
  const [dataToShare, setDataToShare] = useState({
    title: "PressReader",
    text: "Try this prototype!",
    url: "https://tourmaline-unicorn-2c62ec.netlify.app",
  });

  const handleList = () => {
    setDataToShare({
      title: "PressReader",
      text: "Try this prototype!",
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
      }}
    >
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
