import React from "react";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import { PressReaderContextProvider } from "./contexts/PressReaderContext";
import { LanguageContextProvider } from "./contexts/LanguageContext.jsx";
import Search from "./pages/Search.jsx";
import Settings from "./pages/Settings.jsx";
import Main from "./pages/Main.jsx";

function App() {
  return (
    <>
      <LanguageContextProvider>
        <PressReaderContextProvider>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Main />
                  </>
                }
              />
              <Route path="/search" element={<Search />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="*" element={<h1>404 Not found</h1>} />
            </Routes>
            <Footer />
          </Router>
        </PressReaderContextProvider>
      </LanguageContextProvider>
    </>
  );
}

export default App;
