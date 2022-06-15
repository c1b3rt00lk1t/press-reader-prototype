import React, { useContext } from "react";
import PressReaderContext from "../contexts/PressReaderContext";



const Search = () => {

  const {dataAll} = useContext(PressReaderContext);

  const uniqueSessions = dataAll.map(a => a.session).sort((a,b) => a - b).filter( (a,i, arr) => a !== arr[i-1]);


  return (
    <>
      <h1>Search</h1>
      <form action="#">
      <fieldset>
      <label htmlFor="session">Session</label>
      <select name="sessions" id="session">
        {uniqueSessions.map(session => ( <option key={+session} value={session}>{session}</option>))}
      </select>
      </fieldset>

</form>

      <div> Start date <input type="date" /></div>
      <div> End date <input type="date" /></div>
    </>
  );
};

export default Search;
