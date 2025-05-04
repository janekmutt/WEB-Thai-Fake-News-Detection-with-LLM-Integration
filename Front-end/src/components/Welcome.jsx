// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import InfoOne from "./InfoOne";
// import Statistics from "./Statistics";
// import { useTranslation } from "react-i18next";
// import "../App.css";
// import CheckWelcome2 from "../assets/CheckWelcome2.gif";
// import Particle from "../components/Particle.jsx";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { IoIosTime, IoIosClose } from "react-icons/io";

// export const FadeUp = (delay) => {
//   return {
//     initial: {
//       opacity: 0,
//       y: 50,
//     },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         duration: 0.5,
//         delay: delay,
//         ease: "easeInOut",
//       },
//     },
//   };
// };

// const Welcome = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();
//   const [showHistory, setShowHistory] = useState(false);
//   const [historyData, setHistoryData] = useState([]);

//   const [prompt, setPrompt] = useState("");

//   const handleClear = () => {
//     setPrompt("");
//     setTags([]);
//   };

//   const handleGenerate = () => {
//     console.log("Generating prompt:", prompt, "with tags:", tags);
//   };

//   const handleHistoryToggle = () => {
//     setShowHistory((prev) => !prev);
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

//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       <Navbar />

//       {/* ปุ่ม History */}
//       <div className="flex justify-end px-6 mt-4">
//         <button onClick={handleHistoryToggle} className="history-button">
//           <IoIosTime className="mr-2" size={20} />
//           {t("history")}
//         </button>
//       </div>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto relative">
//         <Particle />
//         {/* 🔹 บล็อค Hero พร้อม Prompt อยู่ซ้าย */}
//         <div className="flex flex-col md:flex-row items-start justify-between min-h-[35vh] mt-4 px-6 lg:px-8">
//           {/* 🔹 ฝั่งข้อความ */}
//           <div className="md:w-1/2 flex flex-col space-y-4">
//             <motion.h1
//               variants={FadeUp(0.5)}
//               initial="initial"
//               animate="animate"
//               className="lg:text-6xl text-3xl font-bold lg:leading-snug"
//             >
//               Real or Fake Thai News ?
//             </motion.h1>
//             <motion.p
//               variants={FadeUp(0.75)}
//               initial="initial"
//               animate="animate"
//               className="md:text-xl text-base mb-2"
//             >
//               ความจริงอยู่แค่ปลายนิ้ว ตรวจสอบข่าวได้ทันทีในไม่กี่คลิก
//             </motion.p>

//             <div
//               className="rounded-xl shadow-md px-6 py-4 w-full max-w-xl mt-2"
//               style={{
//                 background:
//                   "linear-gradient(to right, #d3eaf4, #c3e1ef, #a9d4ea, #78bee1, #4aa5d4)",
//               }}
//             >
//               <input
//                 type="text"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder={t("text_check_placeholder")}
//                 className="w-full px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />

//               <div className="flex items-center justify-between mt-4">
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handleClear}
//                     className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
//                   >
//                     Clear all
//                   </button>
//                 </div>

//                 <button
//                   onClick={handleGenerate}
//                   className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 flex items-center gap-2 text-sm"
//                 >
//                   <img
//                     src="https://img.icons8.com/ios-filled/24/ffffff/sent.png"
//                     alt="send icon"
//                     className="w-4 h-4"
//                   />
//                   {t("verify_button")}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* 🔹 รูปภาพด้านขวา */}
//           <div className="md:w-1/2 relative flex justify-center items-end mt-6 md:mt-0">
//             <motion.img
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
//               src={CheckWelcome2}
//               alt="Check Welcome2"
//               className="w-full max-w-[300px] h-auto"
//             />
//           </div>
//         </div>
//       </div>

//       {/* InfoOne และ Statistics ชิดขึ้น */}
//       <div className="mt-4">
//         <InfoOne />
//       </div>

//       <Statistics />

//       {/* แถบด้านขวาสำหรับแสดงประวัติ */}
//       <div className={`history-panel ${showHistory ? "show" : ""}`}>
//         <div className="history-panel-header">
//           <button className="history-toggle-button">
//             <IoIosTime size={24} color="#ffffff" />
//             {t("history")}
//           </button>
//           <button
//             className="close-history-button"
//             onClick={handleHistoryToggle}
//           >
//             <IoIosClose size={24} />
//           </button>
//         </div>
//         <ul>
//           {historyData.length > 0 ? (
//             historyData.map((item, index) => (
//               <li
//                 key={index}
//                 className="history-item"
//                 onClick={() =>
//                   navigate("/NewsHis", { state: { selectedNews: item } })
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 <span
//                   style={{
//                     color:
//                       item.final_label === "Real News"
//                         ? "#23af42"
//                         : item.final_label === "Fake News"
//                         ? "#dd3c3c"
//                         : item.final_label === "Suspicious News"
//                         ? "#c6b538"
//                         : "#000000",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {item.final_label}
//                 </span>
//                 <span>&nbsp;({Math.round(item.final_avg_prob * 100)}%)</span>:{" "}
//                 {item.model_input}
//               </li>
//             ))
//           ) : (
//             <li>{t("no_history_data")}</li>
//           )}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default Welcome;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import InfoOne from "./InfoOne";
import Statistics from "./Statistics";
import { useTranslation } from "react-i18next";
import "../App.css";
import CheckWelcome2 from "../assets/CheckWelcome2.gif";
import Particle from "../components/Particle.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoIosTime, IoIosClose } from "react-icons/io";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [newsContent, setNewsContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setPrompt("");
  };

  const handleGenerate = async () => {
    if (!newsContent.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newsContent }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      navigate("/Result", {
        state: {
          input_text: newsContent,
          newsType: result.prediction,
          probability: result.probability,
          summary: result.summary,
          reasoning: result.reasoning,
          top_content: result.top_content,
          other_links: result.other_links,
          checkMethod: "text",
        },
      });
    } catch (err) {
      console.error("Error during generate:", err);
      alert("เกิดข้อผิดพลาดในการตรวจสอบข่าว");
    } finally {
      setIsLoading(false); // ✅ หยุดโหลด
    }
  };

  const handleHistoryToggle = () => {
    setShowHistory((prev) => !prev);
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Navbar />

      <div className="flex justify-end px-6 mt-4">
        <button onClick={handleHistoryToggle} className="history-button">
          <IoIosTime className="mr-2" size={20} />
          {t("history")}
        </button>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <Particle />
        <div className="flex flex-col md:flex-row items-start justify-between min-h-[35vh] mt-4 px-6 lg:px-8">
          <div className="md:w-1/2 flex flex-col space-y-4">
            <motion.h1
              variants={FadeUp(0.5)}
              initial="initial"
              animate="animate"
              className="lg:text-6xl text-3xl font-bold lg:leading-snug"
            >
              Real or Fake Thai News ?
            </motion.h1>
            <motion.p
              variants={FadeUp(0.75)}
              initial="initial"
              animate="animate"
              className="md:text-xl text-base mb-2"
            >
              ความจริงอยู่แค่ปลายนิ้ว ตรวจสอบข่าวได้ทันทีในไม่กี่คลิก
            </motion.p>

            <div
              className="rounded-xl shadow-md px-6 py-4 w-full max-w-xl mt-2"
              style={{
                background:
                  "linear-gradient(to right, #d3eaf4, #c3e1ef, #a9d4ea, #78bee1, #4aa5d4)",
              }}
            >
              <input
                type="newsContent"
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                placeholder={t("text_check_placeholder")}
                className="w-full px-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
                  >
                    Clear all
                  </button>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    isLoading
                      ? "bg-gradient-to-r from-blue-500 via-blue-200 to-white animate-pulse cursor-not-allowed text-gray-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <img
                    src="https://img.icons8.com/ios-filled/24/ffffff/sent.png"
                    alt="send icon"
                    className="w-4 h-4"
                    style={{ filter: isLoading ? "grayscale(1)" : "none" }}
                  />
                  {isLoading ? `${t("verify_button")}...` : t("verify_button")}
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center items-end mt-6 md:mt-0">
            <motion.img
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              src={CheckWelcome2}
              alt="Check Welcome2"
              className="w-full max-w-[300px] h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <InfoOne />
      </div>

      <Statistics />

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
                onClick={() =>
                  navigate("/NewsHis", { state: { selectedNews: item } })
                }
                style={{ cursor: "pointer" }}
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
    </section>
  );
};

export default Welcome;
