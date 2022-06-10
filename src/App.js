import React from "react";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";

function App() {
  return (
    <>
      <div>Press reader prototype</div>
      <NewsList data = {data}/>
      </>
  );
}

export default App;
