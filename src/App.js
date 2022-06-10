import React from "react";
import Footer from "./components/Footer.jsx";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/"
            element={
              <>
                <h1>Press reader</h1>
                <NewsList data={data} />
              </>
            }
          />
          <Route path="/search" element={<h1>Search</h1>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
