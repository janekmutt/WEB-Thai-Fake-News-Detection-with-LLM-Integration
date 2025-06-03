import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./components/Welcome.jsx";
import TextCheck from "./components/TextCheck.jsx";
import PhotoCheck from "./components/PhotoCheck.jsx";
import LinkCheck from "./components/LinkCheck.jsx";
import About from "./components/About.jsx";
import Result from "./components/Result.jsx";
import NewsHis from "./components/NewsHis.jsx";
import PageTransitionWrapper from "./components/PageTransitionWrapper.jsx";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransitionWrapper>
              <Welcome />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/About"
          element={
            <PageTransitionWrapper>
              <About />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/TextCheck"
          element={
            <PageTransitionWrapper>
              <TextCheck />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/PhotoCheck"
          element={
            <PageTransitionWrapper>
              <PhotoCheck />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/LinkCheck"
          element={
            <PageTransitionWrapper>
              <LinkCheck />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/Result"
          element={
            <PageTransitionWrapper>
              <Result />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/NewsHis"
          element={
            <PageTransitionWrapper>
              <NewsHis />
            </PageTransitionWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
