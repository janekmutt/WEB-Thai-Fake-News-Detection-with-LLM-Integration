import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import { useTranslation } from "react-i18next";

function About() {
  return (
    <>
      <Navbar />
      <main className="about-container">
        <section
          className="about-section"
          role="region"
          aria-label="About Us Section"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5587dc42420e498758513fb4530651f0d144a6925f279bcd8ce089b07796ab10?placeholderIfAbsent=true&apiKey=29c095f8129d4027a45c332c76e3f7d7"
            alt="About Us"
            className="about-image"
          />
          <div className="about-header">
            <h1 className="about-header-text">เกี่ยวกับเรา</h1>
            <div className="about-box" />
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
