import { createContext, useState, useEffect } from "react";
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
      setUniqueTags(dataFlat.flatMap((a) => a.tags)
      .sort()
      .filter((a, i, arr) => a !== arr[i - 1]));

      setDataFiltered(dataFlat);
      setDataOrdered(dataFlat);
    };
    getDataFromDB(handleDataFromDB);
  }, []);



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

  const [orderType, setOrderType] = useState("sessionOrder");


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
      }}
    >
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
