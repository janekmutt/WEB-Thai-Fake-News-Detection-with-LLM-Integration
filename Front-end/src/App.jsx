import { useState, useEffect } from "react";
import "./App.css";

import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import InfoOne from "./components/InfoOne";

function App() {
  return (
    <>
      <Navbar />
      <Welcome />
      <InfoOne />
    </>
  );
}

export default App;
