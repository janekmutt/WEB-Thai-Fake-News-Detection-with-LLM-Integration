// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// import Navbar from "./Navbar";
// import { IoIosTime, IoIosClose } from "react-icons/io"; // Icon for history button
// import { useTranslation } from "react-i18next";
// import "../App.css";
// import bluebg7 from "../assets/bluebg7.mp4";

// const ResultWithChart = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]); // สำหรับเก็บประวัติ
//   const [selectedItem, setSelectedItem] = useState(null); // สำหรับเก็บข้อมูลที่เลือกจากประวัติ

//   const {
//     input_text,
//     newsType,
//     probability = 0,
//     summary = "",
//     reasoning = "",
//     other_links = [],
//   } = location.state || {}; // Check to avoid undefined or null

//   const [gaugeValue, setGaugeValue] = useState(0);
//   const targetValue = Math.round(probability * 100);

//   useEffect(() => {
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
//   }, [targetValue]);

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

//   const gaugeColor = colorMap[newsType] || "#666";
//   const resultText = labelMap[newsType] || t("suspicious_news");

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
//     setSelectedItem(item); // ตั้งค่า item ที่ถูกเลือก
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
//               {t("result_from_text", { text: input_text })}
//             </p>

//             <NewsBox newsType={newsType} t={t} />
//             <p className="result-note">{t("disclaimer_text")}</p>
//           </div>

//           <div className="summary-box">
//             <div className="summary-title">{t("summary")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{summary}</p>
//               </div>
//             </div>
//             <div className="summary-title">{t("reasoning")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{reasoning}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`history-panel ${showHistory ? "show" : ""}`}>
//           <div className="history-panel-header">
//             <button className="history-toggle-button">
//               <IoIosTime size={24} color="#ffffff" />
//               {t("history")}
//             </button>
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
//             {other_links && other_links.length > 0 ? (
//               other_links.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <a
//                     href={item.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="reference-link"
//                   >
//                     {index + 1}. {item.title}
//                   </a>
//                   <br />
//                 </React.Fragment>
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

// export default ResultWithChart;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// import Navbar from "./Navbar";
// import { IoIosTime, IoIosClose } from "react-icons/io";
// import { useTranslation } from "react-i18next";
// import "../App.css";
// import bluebg7 from "../assets/bluebg7.mp4";

// const ResultWithChart = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const {
//     input_text,
//     newsType,
//     probability = 0,
//     summary = "",
//     reasoning = "",
//     other_links = [],
//   } = location.state || {};

//   const [gaugeValue, setGaugeValue] = useState(0);
//   const targetValue = Math.round(probability * 100);

//   useEffect(() => {
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
//   }, [targetValue]);

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

//   const gaugeColor = colorMap[newsType] || "#666";
//   const resultText = labelMap[newsType] || t("suspicious_news");

//   const handleHistoryToggle = () => {
//     setShowHistory((prevState) => !prevState);
//   };

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/get-history");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setHistoryData(data);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       }
//     };
//     fetchHistory();
//   }, []);

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//     navigate("/NewsHis", { state: { selectedNews: item } });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="result-container">
//         <video className="background-video" src={bluebg7} autoPlay loop muted />
//         <h1 className="result-header">{t("result_title")}</h1>

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
//               {t("result_from_text", { text: input_text })}
//             </p>

//             <NewsBox newsType={newsType} t={t} />

//             <p className="result-note">{t("disclaimer_text")}</p>

//             {/* ✅ ปุ่มย้อนกลับ และกลับหน้าหลัก */}
//             <div className="button-group">
//               <button onClick={() => navigate(-1)} className="back-button">
//                 &lt; {t("back_to_check")}
//               </button>
//               <button onClick={() => navigate("/")} className="back-button">
//                 &lt; {t("back_to_home")}
//               </button>
//             </div>
//           </div>

//           <div className="summary-box">
//             <div className="summary-title">{t("summary")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{summary}</p>
//               </div>
//             </div>
//             <div className="summary-title">{t("reasoning")}</div>
//             <div className="summary-content-group">
//               <div className="summary-content">
//                 <p>{reasoning}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={`history-panel ${showHistory ? "show" : ""}`}>
//           <div className="history-panel-header">
//             <button className="history-toggle-button">
//               <IoIosTime size={24} color="#ffffff" />
//               {t("history")}
//             </button>
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

//         <div className="reference-container">
//           <p className="reference-label">{t("related_article")}</p>
//           <div className="reference-box">
//             {other_links && other_links.length > 0 ? (
//               other_links.map((item, index) => (
//                 <React.Fragment key={index}>
//                   <a
//                     href={item.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="reference-link"
//                   >
//                     {index + 1}. {item.title}
//                   </a>
//                   <br />
//                 </React.Fragment>
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

// export default ResultWithChart;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Navbar from "./Navbar";
import { IoIosTime, IoIosClose } from "react-icons/io";
import { useTranslation } from "react-i18next";
import "../App.css";
import bluebg7 from "../assets/bluebg7.mp4";

const ResultWithChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // รับค่าที่ส่งมาจากหน้าก่อนหน้า รวมถึง checkMethod
  const {
    input_text,
    newsType,
    probability = 0,
    summary = "",
    reasoning = "",
    other_links = [],
    checkMethod = "text", // เพิ่มตรงนี้ เพื่อส่งต่อไป NewsHis
  } = location.state || {};

  const [gaugeValue, setGaugeValue] = useState(0);
  const targetValue = Math.round(probability * 100);

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

  const gaugeColor = colorMap[newsType] || "#666";
  const resultText = labelMap[newsType] || t("suspicious_news");

  const handleHistoryToggle = () => {
    setShowHistory((prevState) => !prevState);
  };

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

  // ส่ง selectedNews และ checkMethod ไปยังหน้า NewsHis
  const handleItemClick = (item) => {
    setSelectedItem(item);
    navigate("/NewsHis", {
      state: {
        selectedNews: { ...item, checkMethod }, // ⬅ ฝัง checkMethod ไว้ใน item
        checkMethod,
      },
    });
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
              {t("result_from_text", { text: input_text })}
            </p>

            <NewsBox newsType={newsType} t={t} />

            <p className="result-note">{t("disclaimer_text")}</p>

            {/* ✅ ปุ่มย้อนกลับ และกลับหน้าหลัก */}
            <div className="button-group">
              <button onClick={() => navigate(-1)} className="back-button">
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
                <p>{summary}</p>
              </div>
            </div>
            <div className="summary-title">{t("reasoning")}</div>
            <div className="summary-content-group">
              <div className="summary-content">
                <p>{reasoning}</p>
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
            {other_links && other_links.length > 0 ? (
              other_links.map((item, index) => (
                <React.Fragment key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reference-link"
                  >
                    {index + 1}. {item.title}
                  </a>
                  <br />
                </React.Fragment>
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

export default ResultWithChart;
