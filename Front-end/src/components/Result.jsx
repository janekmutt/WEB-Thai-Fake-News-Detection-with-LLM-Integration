import React from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { newsType, probability } = location.state || {};
  
  // Fallback if accessed directly
  if (!location.state) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
          <h1 className="text-4xl font-bold mb-4">ไม่พบผลการวิเคราะห์</h1>
          <p className="text-lg mb-6">กรุณาทำการตรวจสอบข่าวก่อน</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700"
          >
            กลับไปหน้าหลัก
          </button>
        </div>
      </>
    );
  }

  // Determine styling based on news type
  const typeStyles = {
    True: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-400",
      label: "ข่าวจริง"
    },
    Suspicious: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-400",
      label: "ข่าวน่าสงสัย"
    },
    Fake: {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-400",
      label: "ข่าวปลอม"
    }
  };

  const currentStyle = typeStyles[newsType] || typeStyles.Suspicious;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        {/* Result Box */}
        <div className={`w-full max-w-md p-8 rounded-lg border-2 ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} text-center mb-8`}>
          <h2 className="text-3xl font-bold mb-4">ผลวิเคราะห์ข่าว</h2>
          
          <div className="text-2xl font-semibold mb-2">
            {currentStyle.label}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <div
              className={`h-6 rounded-full ${currentStyle.bg.replace("100", "500")}`}
              style={{ width: `${probability * 100}%` }}
            ></div>
          </div>
          
          <div className="text-xl font-medium">
            ความน่าจะเป็น: {(probability * 100).toFixed(1)}%
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700"
        >
          ตรวจสอบข่าวใหม่
        </button>
      </div>
    </>
  );
}

export default Result;