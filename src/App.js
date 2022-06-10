import React from "react";
import Footer from "./components/Footer.jsx";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import { PressReaderContextProvider } from "./contexts/PressReaderContext";

function App() {
  return (
    <>
      <PressReaderContextProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <h1>Press reader</h1>
                  <NewsList data={data} />
                </>
              }
            />
            <Route path="/search" element={<h1>Search</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
            <Route path="/share" element={<h1>Share</h1>} />
            <Route path="/post/:id" element={<Post data={data} />} />
          </Routes>
          <Footer />
        </Router>
      </PressReaderContextProvider>
    </>
  );
}

export default App;
