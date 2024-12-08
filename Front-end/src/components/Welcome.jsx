import React from "react";
import Navbar from "./Navbar";
import InfoOne from "./InfoOne";
import { useState, useEffect } from "react";
import "../App.css";

function Welcome() {
  const [data, setdata] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      });
  });

  return (
    <>
      <div>
        {typeof data.members === "undefined" ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, i) => <p key={i}>{member}</p>)
        )}
      </div>
      <Navbar />
      <div className="welcome-container">
        <div className="text-center">
          <h1 className="header-title-welcome">Real or Fake Thai News ?</h1>
          <p className="header-subtitle">ทุกคนสามารถตรวจสอบข่าวได้</p>
        </div>
      </div>
      <InfoOne />
    </>
  );
}

export default Welcome;
