import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function onImageChange(e, setImages, setOcrText, setIsLoading) {
  const imageFile = e.target.files[0];
  setImages([imageFile]);
  setIsLoading(true); // เริ่มการโหลด OCR

  // เริ่มทำ OCR ทันทีหลังจากอัปโหลดภาพ
  const formData = new FormData();
  formData.append("image", imageFile);

  fetch("http://localhost:5000/ocr", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ocr_text) {
        setOcrText(data.ocr_text); // กำหนดข้อความที่ได้รับจาก OCR
      } else {
        console.error("OCR Error: ", data.error);
      }
    })
    .catch((error) => console.error("Error during OCR process:", error))
    .finally(() => setIsLoading(false)); // หลังจาก OCR เสร็จ ปิดการโหลด
}

function PhotoCheck() {
  const [images, setImages] = useState([]);
  const [ocrText, setOcrText] = useState(""); // ค่าเริ่มต้นเป็นค่าว่าง
  const [isLoading, setIsLoading] = useState(false); // กำหนดสถานะการโหลด
  const [imageURLs, setImageURLs] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);
  }, [images]);

  const handleVerifyClick = async () => {
    if (images.length < 1) {
      console.log("No image selected");
      return;
    }

    // ตั้งค่า isLoading ให้เป็น true เพื่อแสดงสถานะการโหลด
    setIsLoading(true);

    try {
      // ส่งข้อความที่ได้จาก OCR ไปยัง API /predict
      const predictResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: ocrText }), // ส่งข้อความ OCR
      });

      const result = await predictResponse.json();
      console.log("Prediction Result:", result);

      // ส่งไปยังหน้า Result
      navigate("/Result", {
        state: {
          input_text: ocrText,
          newsType: result.prediction,
          probability: result.probability,
          summary: result.summary,
          reasoning: result.reasoning,
          top_content: result.top_content,
          other_links: result.other_links,
          checkMethod: "image",
        },
      });
    } catch (err) {
      console.error("Error during prediction:", err);
    } finally {
      // หลังจากการทำนายเสร็จสิ้น ปิดสถานะ isLoading
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="photocheck-container">
        <video
          className="background-video"
          src={bluebg12}
          autoPlay
          loop
          muted
        />
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true"
            alt="PhotoCheck"
          />
        </div>

        <h1 className="header-title">{t("photo_check_title")}</h1>

        <label htmlFor="uploadFile1" className="upload-button">
          <input
            type="file"
            id="uploadFile1"
            accept="image/*"
            onChange={(e) =>
              onImageChange(e, setImages, setOcrText, setIsLoading)
            }
          />
          {t("upload_button")}
        </label>

        <div className="image-preview">
          {imageURLs.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Preview ${index}`} />
          ))}
        </div>

        {/* แสดงแอนิเมชั่นการโหลด (loading spinner) ขณะทำ OCR */}
        <div className="ocr-text">
          {isLoading ? (
            <div className="loading-spinner"></div> // แสดงวงกลมหมุนสีฟ้าขณะกำลังโหลด
          ) : (
            ocrText && (
              <textarea
                value={ocrText}
                onChange={(e) => setOcrText(e.target.value)} // ให้ผู้ใช้แก้ไขข้อความ
                rows="4"
                cols="50"
                className="ocr-textarea" // ใช้ className สำหรับปรับแต่ง CSS
              />
            )
          )}
        </div>

        {/* ปุ่มที่แสดงข้อความขณะรอ */}
        <button
          type="submit"
          className={`submit-button ${isLoading ? "disabled" : ""}`}
          disabled={isLoading} // ปิดการใช้งานปุ่มขณะรอ
          onClick={handleVerifyClick}
        >
          {isLoading ? `${t("verify_button")}...` : t("verify_button")}
        </button>
      </div>
    </>
  );
}

export default PhotoCheck;
