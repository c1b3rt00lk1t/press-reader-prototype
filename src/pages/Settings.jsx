import React, {useState} from "react";

import {getDataFromDB} from "../firebase";



const Settings = () => {
  const [names,setNames] = useState([]);

  return (
    <>
      <h1>Settings</h1>
      <p style={{fontSize: '0.8em'}}>Prototype: 202206231251</p>
      {names.map((name,i) => <p key={i}>{name}</p>)}
      <button onClick={() => getDataFromDB(setNames)}>Get Data</button>
    </>
  );
};

export default Settings;
