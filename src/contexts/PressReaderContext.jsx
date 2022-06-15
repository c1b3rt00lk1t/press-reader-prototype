import { createContext, useState } from "react";
import { data } from "../data/data.js";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {

  const [dataAll] = useState(data);

  const uniqueSessions = dataAll
    .map((a) => a.session)
    .sort((a, b) => b - a)
    .filter((a, i, arr) => a !== arr[i - 1]);

  const uniqueZones = dataAll
    .flatMap((a) => a.zone)
    .sort()
    .filter((a, i, arr) => a !== arr[i - 1]);




  // const [criteriaToFilter, setCriteriaToFilter] = useState({});
  // const [dataFiltered, setDataFiltered] = useState(data);
  // const [criteriaToOrder, setCriteriaToOrder] = useState({});
  // const [dataOrdered, setDataOrdered] = useState(data);
  const [dataOrdered] = useState(data);
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

  }

 

  const handleShare = async () => {
    try {
      await navigator.share(dataToShare);
      console.log(dataToShare)
    } catch (err) {
      console.log("Error in the sharing process");
    }
  };




  return (
    <PressReaderContext.Provider value={{ dataAll, uniqueSessions, uniqueZones, dataOrdered, postSelected, setPostSelected, handleShare, setDataToShare,handleList }}>
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
