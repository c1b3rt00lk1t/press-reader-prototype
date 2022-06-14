import React from "react";
import Footer from "./components/Footer.jsx";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import { PressReaderContextProvider } from "./contexts/PressReaderContext";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import Share from "./pages/Share.jsx";

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
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/share" element={<Share/>} />
            <Route path="/post/:id" element={<Post data={data} />} />
            <Route path="*" element={<h1>404 Not found</h1>} />
          </Routes>
          <Footer />
        </Router>
      </PressReaderContextProvider>
    </>
  );
}

export default App;
