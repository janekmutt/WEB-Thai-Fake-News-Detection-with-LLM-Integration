// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// import Navbar from "./Navbar";
// import "../App.css";
// import bluebg7 from "../assets/bluebg7.mp4";
// import { useTranslation } from "react-i18next";

// function Result() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { newsType, probability } = location.state || {};

//   // Fallback if accessed directly
//   if (!location.state) {
//     return (
//       <>
//         <Navbar />
//         <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
//           <h1 className="text-4xl font-bold mb-4">ไม่พบผลการวิเคราะห์</h1>
//           <p className="text-lg mb-6">กรุณาทำการตรวจสอบข่าวก่อน</p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700"
//           >
//             กลับไปหน้าหลัก
//           </button>
//         </div>
//       </>
//     );
//   }

//   // Determine styling based on news type
//   const typeStyles = {
//     True: {
//       bg: "bg-green-100",
//       text: "text-green-800",
//       border: "border-green-400",
//       label: "ข่าวจริง",
//     },
//     Suspicious: {
//       bg: "bg-yellow-100",
//       text: "text-yellow-800",
//       border: "border-yellow-400",
//       label: "ข่าวน่าสงสัย",
//     },
//     Fake: {
//       bg: "bg-red-100",
//       text: "text-red-800",
//       border: "border-red-400",
//       label: "ข่าวปลอม",
//     },
//   };

//   const currentStyle = typeStyles[newsType] || typeStyles.Suspicious;

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
//         {/* Result Box */}
//         <div
//           className={`w-full max-w-md p-8 rounded-lg border-2 ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} text-center mb-8`}
//         >
//           <h2 className="text-3xl font-bold mb-4">ผลวิเคราะห์ข่าว</h2>

//           <div className="text-2xl font-semibold mb-2">
//             {currentStyle.label}
//           </div>

//           <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
//             <div
//               className={`h-6 rounded-full ${currentStyle.bg.replace(
//                 "100",
//                 "500"
//               )}`}
//               style={{ width: `${probability * 100}%` }}
//             ></div>
//           </div>

//           <div className="text-xl font-medium">
//             ความน่าจะเป็น: {(probability * 100).toFixed(1)}%
//           </div>
//         </div>

//         {/* Back button */}
//         <button
//           onClick={() => navigate("/")}
//           className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700"
//         >
//           ตรวจสอบข่าวใหม่
//         </button>
//       </div>
//     </>
//   );
// }

// export default Result;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Navbar from "./Navbar";
import "../App.css";
import bluebg7 from "../assets/bluebg7.mp4";
import { useTranslation } from "react-i18next";

const ResultWithChart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { input_text, newsType, probability = 0 } = location.state || {};

  // Fallback UI if page is accessed directly
  if (!location.state) {
    return (
      <>
        <Navbar />
        <div className="result-container">
          <video
            className="background-video"
            src={bluebg7}
            autoPlay
            loop
            muted
          />
          <div className="fallback-message">
            <h1 className="text-3xl font-bold mb-4">{t("not_found")}</h1>
            <p className="text-lg mb-6">{t("please_check_first")}</p>
            <button
              onClick={() => navigate("/")}
              className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700"
            >
              {t("back_to_home")}
            </button>
          </div>
        </div>
      </>
    );
  }

  const [gaugeValue, setGaugeValue] = useState(0);
  const targetValue = Math.round(probability * 100);

  useEffect(() => {
    const checkedNewsCount = localStorage.getItem("checkedNewsCount");
    const updatedCount = checkedNewsCount ? parseInt(checkedNewsCount) + 1 : 1;
    localStorage.setItem("checkedNewsCount", updatedCount);
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
    True: t("real_news"),
    Fake: t("fake_news"),
    Suspicious: t("suspicious_news"),
  };

  const colorMap = {
    True: "#23af42",
    Fake: "#dd3c3c",
    Suspicious: "#c6b538",
  };

  const gaugeColor = colorMap[newsType] || "#666";
  const resultText = labelMap[newsType] || t("suspicious_news");

  const mockLink = "http://www.sample.info/?spy=liquid&north=pest#relation";

  return (
    <>
      <Navbar />
      <div className="result-container">
        <video className="background-video" src={bluebg7} autoPlay loop muted />
        <h1 className="result-header">{t("result_title")}</h1>

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
          </div>

          <div className="summary-box">
            <div className="summary-title">{t("summary")}</div>
            <div className="summary-content-group">
              <div className="summary-content">
                <p>ประเด็นที่ 1...</p>
              </div>
              <div className="summary-content">
                <p>ประเด็นที่ 2...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reference-container">
          <p className="reference-label">{t("related_article")}</p>
          <div className="reference-box">
            <a href={mockLink} target="_blank" rel="noopener noreferrer">
              {mockLink}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

function NewsBox({ newsType, t }) {
  const labelMap = {
    True: t("real_news"),
    Fake: t("fake_news"),
    Suspicious: t("suspicious_news"),
  };

  const boxClassMap = {
    True: "news-box real",
    Fake: "news-box fake",
    Suspicious: "news-box suspicious",
  };

  const label = labelMap[newsType] || t("suspicious_news");
  const boxClass = boxClassMap[newsType] || "news-box suspicious";

  return <div className={boxClass}>{label}</div>;
}

export default ResultWithChart;
