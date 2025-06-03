import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { NewsCheck } from "./Dataselect";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css";

function Navbar() {
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(i18n.language); // ✅ ผูกสถานะกับภาษา

  const highlightRef = useRef(null);
  const thBtnRef = useRef(null);
  const enBtnRef = useRef(null);

  useEffect(() => {
    const highlight = highlightRef.current;
    const targetBtn =
      currentLang === "th" ? thBtnRef.current : enBtnRef.current;
    if (highlight && targetBtn) {
      highlight.style.width = `${targetBtn.offsetWidth}px`;
      highlight.style.left = `${targetBtn.offsetLeft}px`;
    }
  }, [currentLang]);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng); // ✅ update state ทันที
  };

  const BarSelect = NewsCheck(t); // ใช้ t จาก useTranslation

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              {t("home")}
            </Link>
          </li>

          <li className="navbar-item">
            <div className="navbar-link">
              {t("verify_news")}
              <span>
                <FaCaretDown className="dropdown-icon" />
              </span>
            </div>
            <div className="dropdown-content">
              <ul className="dropdown-list">
                {BarSelect.map((item, index) => (
                  <li key={index} className="dropdown-item">
                    <a href={item.link} className="dropdown-link">
                      <img src={item.image} alt={item.alt} />
                      <span>{item.Title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="navbar-item">
            <Link to="/About" className="navbar-link">
              {t("about_us")}
            </Link>
          </li>
        </ul>

        {/* ปุ่มภาษา TH/ENG */}
        <div className="lang-toggle">
          <div className="lang-highlight" ref={highlightRef}></div>
          <button
            ref={thBtnRef}
            className={`lang-btn ${currentLang === "th" ? "active" : ""}`}
            onClick={() => switchLanguage("th")}
          >
            TH
          </button>
          <button
            ref={enBtnRef}
            className={`lang-btn ${currentLang === "en" ? "active" : ""}`}
            onClick={() => switchLanguage("en")}
          >
            ENG
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
