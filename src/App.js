import React from "react";
import { data } from "./data/data.js";

function App() {
  return (
    <>
      <div>Press reader prototype</div>
      <ul>
      {data.map(d => <li key={d.id}>{d.title}</li> )}
      </ul>
</>
  );
}

export default App;
