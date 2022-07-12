import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import NewsItem from "./NewsItem";

const NewsList = () => {
  const { dataOrdered } = useContext(PressReaderContext);

  return (
    <>
      {dataOrdered.length > 255 && <div className="tags" style={{textAlign:"center"}}>{">"}255 results</div>}
      {!!dataOrdered.length && (
        <ul>
          {dataOrdered.slice(0,255).map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </>
  );
};

export default NewsList;
