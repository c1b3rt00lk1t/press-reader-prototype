import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import NewsItem from "./NewsItem";

const NewsList = ({texts,language}) => {
  const { dataOrdered } = useContext(PressReaderContext);
  const MAX_SHOW = 1500;
  return (
    <>
      {dataOrdered.length > MAX_SHOW ? <div className="tags" style={{textAlign:"center"}}>{">"}{MAX_SHOW} {texts[language].main.results}</div> : <div className="tags" style={{textAlign:"center"}}>{dataOrdered.length} {texts[language].main.results}</div>}
      {!!dataOrdered.length && (
        <ul>
          {dataOrdered.slice(0,MAX_SHOW).map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
};

export default NewsList;
