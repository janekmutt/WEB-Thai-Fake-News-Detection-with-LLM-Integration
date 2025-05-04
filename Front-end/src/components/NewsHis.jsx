import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Navbar from "./Navbar";
import { IoIosTime, IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import "../App.css";
import bluebg7 from "../assets/bluebg7.mp4";

const NewsHis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ รับ selectedNews และ checkMethod จาก state
  const { selectedNews, checkMethod: passedCheckMethod } = location.state || {};
  const checkMethod = passedCheckMethod || selectedNews?.checkMethod || "text";

  const targetValue = Math.round(selectedNews?.final_avg_prob * 100);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-history");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGaugeValue((prev) => {
        if (prev >= targetValue) {
          clearInterval(interval);
          return targetValue;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [targetValue]);

  const labelMap = {
    "Real News": t("real_news"),
    "Fake News": t("fake_news"),
    "Suspicious News": t("suspicious_news"),
  };

  const colorMap = {
    "Real News": "#23af42",
    "Fake News": "#dd3c3c",
    "Suspicious News": "#c6b538",
  };

  const gaugeColor = colorMap[selectedNews?.final_label] || "#666";
  const resultText =
    labelMap[selectedNews?.final_label] || t("suspicious_news");

  const handleHistoryToggle = () => {
    setShowHistory((prevState) => !prevState);
  };

  const handleItemClick = (item) => {
    navigate("/NewsHis", { state: { selectedNews: item, checkMethod } });
  };

  // ✅ ฟังก์ชันย้อนกลับตามประเภทที่ตรวจสอบ
  const handleBackToCheck = () => {
    if (checkMethod === "text") {
      navigate("/TextCheck");
    } else if (checkMethod === "link") {
      navigate("/LinkCheck");
    } else if (checkMethod === "image") {
      navigate("/PhotoCheck");
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="result-container">
        <video className="background-video" src={bluebg7} autoPlay loop muted />
        <h1 className="result-header">{t("result_title")}</h1>

        <div className="history-button-container">
          <button className="history-button" onClick={handleHistoryToggle}>
            <IoIosTime size={24} color="#ffffff" /> {t("history")}
          </button>
        </div>

        <div className="result-layout">
          <div className="left-panel">
            <div className="chart-container">
              <Gauge
                value={gaugeValue}
                startAngle={-110}
                endAngle={110}
                thickness={22}
                sx={{
                  "& .MuiGauge-svg": { color: gaugeColor },
                  [`& .${gaugeClasses.valueArc}`]: { fill: gaugeColor },
                  valueText: {
                    fontSize: "50px",
                    fontWeight: "bold",
                    transform: "translate(0px, 1px)",
                  },
                }}
                arcColorFn={() => gaugeColor}
                text={({ value }) => `${value}%`}
              />
              <div className="gauge-result-text">{resultText}</div>
            </div>

            <p className="result-subtitle">
              {t("news_title")} "{selectedNews?.model_input}"
            </p>

            <NewsBox newsType={selectedNews?.final_label} t={t} />
            <p className="result-note">{t("disclaimer_text")}</p>

            {/* ✅ ปุ่มย้อนกลับและกลับหน้าหลัก */}
            <div className="button-group">
              <button onClick={handleBackToCheck} className="back-button">
                &lt; {t("back_to_check")}
              </button>
              <button onClick={() => navigate("/")} className="back-button">
                &lt; {t("back_to_home")}
              </button>
            </div>
          </div>

          <div className="summary-box">
            <div className="summary-title">{t("summary")}</div>
            <div className="summary-content-group">
              <div className="summary-content">
                <p>{selectedNews?.summary}</p>
              </div>
            </div>
            <div className="summary-title">{t("reasoning")}</div>
            <div className="summary-content-group">
              <div className="summary-content">
                <p>{selectedNews?.reason}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`history-panel ${showHistory ? "show" : ""}`}>
          <div className="history-panel-header">
            <button className="history-toggle-button">
              <IoIosTime size={24} color="#ffffff" />
              {t("history")}
            </button>
            <button
              className="close-history-button"
              onClick={handleHistoryToggle}
            >
              <IoIosClose size={24} />
            </button>
          </div>

          <ul>
            {historyData.length > 0 ? (
              historyData.map((item, index) => (
                <li
                  key={index}
                  className="history-item"
                  onClick={() => handleItemClick(item)}
                >
                  <span
                    style={{
                      color:
                        item.final_label === "Real News"
                          ? "#23af42"
                          : item.final_label === "Fake News"
                          ? "#dd3c3c"
                          : item.final_label === "Suspicious News"
                          ? "#c6b538"
                          : "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {item.final_label}
                  </span>
                  <span>&nbsp;({Math.round(item.final_avg_prob * 100)}%)</span>:{" "}
                  {item.model_input}
                </li>
              ))
            ) : (
              <li>{t("no_history_data")}</li>
            )}
          </ul>
        </div>

        <div className="reference-container">
          <p className="reference-label">{t("related_article")}</p>
          <div className="reference-box">
            {selectedNews?.other_links &&
            selectedNews.other_links.length > 0 ? (
              selectedNews.other_links.map((item, index) => (
                <div key={index} className="reference-item">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reference-link"
                  >
                    {index + 1}. {item.title}
                  </a>
                </div>
              ))
            ) : (
              <p>{t("no_related_articles")}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

function NewsBox({ newsType, t }) {
  const labelMap = {
    "Real News": t("real_news"),
    "Fake News": t("fake_news"),
    "Suspicious News": t("suspicious_news"),
  };

  const boxClassMap = {
    "Real News": "news-box real",
    "Fake News": "news-box fake",
    "Suspicious News": "news-box suspicious",
  };

  const label = labelMap[newsType] || t("suspicious_news");
  const boxClass = boxClassMap[newsType] || "news-box suspicious";

  return <div className={boxClass}>{label}</div>;
}

export default NewsHis;
