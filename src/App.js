import React from "react";
import Footer from "./components/Footer.jsx";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";

function App() {
  return (
    <>
      <h1>Press reader</h1>
      <NewsList data = {data}/>
      <Footer />  
    </>
  );
}

export default App;
