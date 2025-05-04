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

      {/* ปุ่ม History */}
      <div className="flex justify-end px-6 mt-4">
        <button onClick={handleHistoryToggle} className="history-button">
          <IoIosTime className="mr-2" size={20} />
          {t("history")}
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative">
        <Particle />
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[35vh] mt-4">
          <div className="md:w-1/2 flex flex-col space-y-4 px-6 lg:px-8">
            <motion.h1
              variants={FadeUp(0.5)}
              initial="initial"
              animate="animate"
              className="lg:text-6xl text-3xl font-bold lg:leading-snug"
            >
              <br /> Real or Fake Thai News ?
            </motion.h1>
            <motion.p
              variants={FadeUp(0.75)}
              initial="initial"
              animate="animate"
              className="md:text-xl text-base mb-4"
            >
              ความจริงอยู่แค่ปลายนิ้ว ตรวจสอบข่าวได้ทันทีในไม่กี่คลิก
            </motion.p>
          </div>

          <div className="md:w-1/2 relative flex justify-center items-end">
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

      {/* InfoOne และ Statistics ชิดขึ้น */}
      <div className="mt-4">
        <InfoOne />
      </div>

      <Statistics />

      {/* แถบด้านขวาสำหรับแสดงประวัติ */}
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
