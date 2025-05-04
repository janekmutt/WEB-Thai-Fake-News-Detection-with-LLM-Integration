import React from "react";
import { motion } from "framer-motion";
import { NewsCheck } from "./Dataselect";
import { useTranslation } from "react-i18next";
import "../App.css";

const SlideLeft = (delay) => ({
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const SelectCheck = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="container pb-14 pt-16 ">
      <h1 className="text-4xl font-bold text-left pb-10">
        {t("how_to_verify_news")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={SlideLeft(index * 0.5)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-blue-500 transition-all duration-300"
          >
            <a href={item.link}>
              <img
                className="w-16 h-16 mb-4 object-contain"
                src={item.image}
                alt={item.alt}
              />
            </a>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-2">{item.Title}</h5>
              <p className="text-gray-600 mb-4">{item.Points}</p>
            </div>

            <a
              href={item.link}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              {t("select_button")}
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function InfoOne() {
  const { t } = useTranslation(); // ✅ ใช้เพื่อส่งไป NewsCheck
  const newsData = NewsCheck(t); // ✅ ส่ง t เข้าไป

  return (
    <div
      className="mt-10 flex flex-wrap justify-center items-center gap-10 "
      style={{
        backgroundImage:
          "linear-gradient(to top, #00a0f3, #4ab3f4, #73c4f5, #98d6f7, #bde6f9, #ccedf9, #dcf3fa, #ecf9fc, #eaf8f9, #e8f7f7, #e7f5f4, #e6f4f1,#FFFFFF,#FFFFFF)",
      }}
    >
      <SelectCheck items={newsData} />
    </div>
  );
}
