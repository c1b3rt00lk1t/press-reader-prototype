import { createContext, useState } from "react";
import { data } from "../data/data.js";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {

  // const [dataAll, setDataAll] = useState(data);
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
      //this will catch the second share attempt in iOS 14
    	window.location.reload(true); // now share works again
    }
  };




  return (
    <PressReaderContext.Provider value={{ dataOrdered, postSelected, setPostSelected, handleShare, setDataToShare,handleList }}>
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
