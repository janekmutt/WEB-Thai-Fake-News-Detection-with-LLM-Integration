import React from "react";
import Navbar from "./Navbar";
import "../App.css";

function Result() {
  const newsType = "real";
  const mockLink = "http://www.sample.info/?spy=liquid&north=pest#relation";
  return (
    <>
      <Navbar />
      <div className="result-container">
        <h1 className="result-header">ผลวิเคราะห์ข่าว</h1>
        <p className="result-subtitle">จาก</p>
        {createNewsBox({ newsType })}
        <p className="reference-label">การอ้างอิงลิงก์</p>
        <p className="reference-box">{mockLink}</p>
      </div>
    </>
  );
}

function createNewsBox({ newsType }) {
  let boxClass = "news-box"; // คลาสพื้นฐาน
  if (newsType === "fake") {
    boxClass += " fake";
  } else if (newsType === "real") {
    boxClass += " real";
  } else if (newsType === "suspicious") {
    boxClass += " suspicious";
  }

  return (
    <div className={boxClass}>
      {newsType === "real"
        ? "ข่าวจริง"
        : newsType === "fake"
        ? "ข่าวปลอม"
        : "ข่าวบิดเบือน"}
    </div>
  );
}

export default Result;
