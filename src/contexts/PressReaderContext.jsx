import { createContext, useState } from "react";
import NewsItem from "../components/NewsItem.jsx";
import { data } from "../data/data.js";

const PressReaderContext = createContext();

export const PressReaderContextProvider = ({ children }) => {

  const [dataAll, setDataAll] = useState(data);
  const [criteriaToFilter, setCriteriaToFilter] = useState({});
  const [dataFiltered, setDataFiltered] = useState(data);
  const [criteriaToOrder, setCriteriaToOrder] = useState({});
  const [dataOrdered, setDataOrdered] = useState(data);
  const [postSelected, setPostSelected] = useState(null);
  const [dataToShare, setDataToShare] = useState({
    title: "PressReader",
    text: "Try this prototype!",
    url: "https://tourmaline-unicorn-2c62ec.netlify.app",
  });


  


  const getSelectedPost = (id) => {
    const item = dataOrdered.filter((a) => `${a.id}` === id)[0];
    const indexItem = dataOrdered.indexOf(item);
  
    postSelected(dataOrdered[indexItem].id)
    return {item, indexItem};
  };



 

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
    <PressReaderContext.Provider value={{ dataOrdered, postSelected, setPostSelected, handleShare, setDataToShare }}>
      {children}
    </PressReaderContext.Provider>
  );
};

export default PressReaderContext;
