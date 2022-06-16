import React, {useContext} from "react";
import PressReaderContext from "../contexts/PressReaderContext";
import NewsItem from "./NewsItem";

const NewsList = () => {

  const {dataOrdered} = useContext(PressReaderContext)

  return (
    <>
      <ul>
        {dataOrdered.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
};

export default NewsList;
