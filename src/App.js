import React from "react";
import Footer from "./components/Footer.jsx";
import NewsList from "./components/NewsList.jsx";
import { data } from "./data/data.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import { PressReaderContextProvider } from "./contexts/PressReaderContext";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";


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
                  <h1>Reader</h1>
                  <NewsList />
                </>
              }
            />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
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
