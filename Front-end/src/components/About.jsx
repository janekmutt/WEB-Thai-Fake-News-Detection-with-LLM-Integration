
import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import { useTranslation } from "react-i18next";
import sealLogo from "../assets/Seal_of_King_Mongkut's_University_of_Technology_Thonburi.svg.png";
import kmuttCpeLogo from "../assets/kmutt-cpe-logo.png";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <main className="about-container">
        <section className="about-section" aria-label="About Us Section">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5587dc42420e498758513fb4530651f0d144a6925f279bcd8ce089b07796ab10?placeholderIfAbsent=true&apiKey=29c095f8129d4027a45c332c76e3f7d7"
            alt="About Us"
            className="about-image"
          />
          <div className="about-header">
            <div className="about-title-wrapper">
              <h1 className="about-header-text">{t("about_us")}</h1>
            </div>

            <div className="about-box about-text-box">
              <p className="about-description">{t("about")}</p>
            </div>

            <div className="about-box about-logo-box">
              <img src={sealLogo} alt="KMUTT Seal" className="about-logo" />
              <img
                src={kmuttCpeLogo}
                alt="KMUTT CPE Logo"
                className="about-logo"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
