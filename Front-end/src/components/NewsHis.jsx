// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// import Navbar from "./Navbar";
// import { IoIosTime, IoIosClose } from "react-icons/io"; // Icon for history button
// import { useTranslation } from "react-i18next";
// import "../App.css";
// import bluebg7 from "../assets/bluebg7.mp4";

// const NewsHis = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   // ดึงข้อมูลข่าวจาก state ที่ส่งมาจาก ResultWithChart
//   const { selectedNews } = location.state || {};

//   // กำหนดค่า gaugeValue จาก final_avg_prob
//   const targetValue = Math.round(selectedNews?.final_avg_prob * 100); // คำนวณ targetValue
//   const [gaugeValue, setGaugeValue] = useState(0);

//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null); // สถานะสำหรับการเลือก item

//   const {
//     input_text,
//     newsType,
//     probability = 0,
//     summary = "",
//     reasoning = "",
//     other_links = [],
//   } = location.state || {}; // Check to avoid undefined or null

//   useEffect(() => {
//     if (location.state) {
//       console.log("Latest Data:", location.state);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     // เพิ่มการคำนวณและอัปเดตค่า gaugeValue
//     const interval = setInterval(() => {
//       setGaugeValue((prev) => {
//         if (prev >= targetValue) {
//           clearInterval(interval);
//           return targetValue;
//         }
//         return prev + 1;
//       });
//     }, 20);
//     return () => clearInterval(interval);
//   }, [targetValue]); // ตรวจสอบค่า targetValue

//   const labelMap = {
//     "Real News": t("real_news"),
//     "Fake News": t("fake_news"),
//     "Suspicious News": t("suspicious_news"),
//   };

//   const colorMap = {
//     "Real News": "#23af42",
//     "Fake News": "#dd3c3c",
//     "Suspicious News": "#c6b538",
//   };

//   const gaugeColor = colorMap[selectedNews?.final_label] || "#666";
//   const resultText =
//     labelMap[selectedNews?.final_label] || t("suspicious_news");

//   const handleHistoryToggle = () => {
//     setShowHistory((prevState) => !prevState);
//   };

//   // Fetch history data on component mount
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/get-history");

//         // ตรวจสอบสถานะการตอบกลับจากเซิร์ฟเวอร์
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Fetched history data:", data);
//         setHistoryData(data);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       }
//     };
//     fetchHistory();
//   }, []);

//   // ฟังก์ชันสำหรับจัดการคลิกที่รายการ history
//   const handleItemClick = (item) => {
//     // ส่งข้อมูลที่เลือกไปยังหน้า NewsHis.jsx
//     navigate("/NewsHis", { state: { selectedNews: item } });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="result-container">
//         <video className="background-video" src={bluebg7} autoPlay loop muted />
//         <h1 className="result-header">{t("result_title")}</h1>

//         {/* Button to toggle history panel */}
//         <div className="history-button-container">
//           <button className="history-button" onClick={handleHistoryToggle}>
//             <IoIosTime size={24} color="#ffffff" /> {t("history")}
//           </button>
//         </div>

//         <div className="result-layout">
//           <div className="left-panel">
//             <div className="chart-container">
//               <Gauge
//                 value={gaugeValue}
//                 startAngle={-110}
//                 endAngle={110}
//                 thickness={22}
//                 sx={{
//                   "& .MuiGauge-svg": { color: gaugeColor },
//                   [`& .${gaugeClasses.valueArc}`]: { fill: gaugeColor },
//                   valueText: {
//                     fontSize: "50px",
//                     fontWeight: "bold",
//                     transform: "translate(0px, 1px)",
//                   },
//                 }}
//                 arcColorFn={() => gaugeColor}
//                 text={({ value }) => `${value}%`}
//               />
//               <div className="gauge-result-text">{resultText}</div>
//             </div>

//             <p className="result-subtitle">
//               {t("news_title")} "{selectedNews?.model_input}"
//             </p>

//             <NewsBox newsType={selectedNews?.final_label} t={t} />
//             <p className="result-note">{t("disclaimer_text")}</p>
//           </div>

//           <div className="summary-box">
//             <div className="summary-title">{t("summary")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{selectedNews?.summary}</p>
//               </div>
//             </div>
//             <div className="summary-title">{t("reasoning")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{selectedNews?.reasoning}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* History panel that shows when the button is clicked */}
//         <div className={`history-panel ${showHistory ? "show" : ""}`}>
//           <div className="history-panel-header">
//             <div className="history-title">
//               <a
//                 href="https://icons8.com/icon/aaTpj20wTQGS/time-machine"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img
//                   src="https://img.icons8.com/ios/452/time-machine.png"
//                   alt="App Icon"
//                   width="20"
//                   height="20"
//                 />
//               </a>{" "}
//               {t("history")}
//             </div>
//             <button
//               className="close-history-button"
//               onClick={handleHistoryToggle}
//             >
//               <IoIosClose size={24} />
//             </button>
//           </div>

//           <ul>
//             {historyData.length > 0 ? (
//               historyData.map((item, index) => (
//                 <li
//                   key={index}
//                   className="history-item"
//                   onClick={() => handleItemClick(item)}
//                 >
//                   <span
//                     style={{
//                       color:
//                         item.final_label === "Real News"
//                           ? "#23af42"
//                           : item.final_label === "Fake News"
//                           ? "#dd3c3c"
//                           : item.final_label === "Suspicious News"
//                           ? "#c6b538"
//                           : "#000000",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {item.final_label}
//                   </span>
//                   <span>&nbsp;({Math.round(item.final_avg_prob * 100)}%)</span>:{" "}
//                   {item.model_input}
//                 </li>
//               ))
//             ) : (
//               <li>{t("no_history_data")}</li>
//             )}
//           </ul>
//         </div>

//         {/* Related Articles Section */}
//         <div className="reference-container">
//           <p className="reference-label">{t("related_article")}</p>
//           <div className="reference-box">
//             {selectedNews?.other_links &&
//             selectedNews.other_links.length > 0 ? (
//               selectedNews.other_links.map((item, index) => (
//                 <div key={index} className="reference-item">
//                   <a
//                     href={item.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="reference-link"
//                   >
//                     {index + 1}. {item.title}
//                   </a>
//                 </div>
//               ))
//             ) : (
//               <p>{t("no_related_articles")}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// function NewsBox({ newsType, t }) {
//   const labelMap = {
//     "Real News": t("real_news"),
//     "Fake News": t("fake_news"),
//     "Suspicious News": t("suspicious_news"),
//   };

//   const boxClassMap = {
//     "Real News": "news-box real",
//     "Fake News": "news-box fake",
//     "Suspicious News": "news-box suspicious",
//   };

//   const label = labelMap[newsType] || t("suspicious_news");
//   const boxClass = boxClassMap[newsType] || "news-box suspicious";

//   return <div className={boxClass}>{label}</div>;
// }

// export default NewsHis;
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Navbar from "./Navbar";
import { IoIosTime, IoIosClose } from "react-icons/io"; // Icon for history button
import { useTranslation } from "react-i18next";
import "../App.css";
import bluebg7 from "../assets/bluebg7.mp4";

const NewsHis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ดึงข้อมูลข่าวจาก state ที่ส่งมาจาก ResultWithChart
  const { selectedNews } = location.state || {};

  // กำหนดค่า gaugeValue จาก final_avg_prob
  const targetValue = Math.round(selectedNews?.final_avg_prob * 100); // คำนวณ targetValue
  const [gaugeValue, setGaugeValue] = useState(0);

  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]); // สำหรับเก็บประวัติการทำนาย

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูล history จาก API เมื่อ component โหลด
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-history");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHistoryData(data); // เก็บข้อมูล history ลงใน state
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    // เพิ่มการคำนวณและอัปเดตค่า gaugeValue
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
    setShowHistory((prevState) => !prevState); // การสลับการแสดงหรือซ่อน history panel
  };

  const handleItemClick = (item) => {
    // ส่งข้อมูลที่เลือกไปยังหน้า NewsHis.jsx
    navigate("/NewsHis", { state: { selectedNews: item } });
  };

  return (
    <>
      <Navbar />
      <div className="result-container">
        <video className="background-video" src={bluebg7} autoPlay loop muted />
        <h1 className="result-header">{t("result_title")}</h1>

        {/* Button to toggle history panel */}
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
                <p>{selectedNews?.reasoning}</p>
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

        {/* Related Articles Section */}
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
