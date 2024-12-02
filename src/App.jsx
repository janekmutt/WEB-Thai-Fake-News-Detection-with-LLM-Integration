import { useState } from "react";
import "./App.css";

import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import InfoOne from "./components/InfoOne";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Welcome />
      <InfoOne />
    </>
  );
}

export default App;
