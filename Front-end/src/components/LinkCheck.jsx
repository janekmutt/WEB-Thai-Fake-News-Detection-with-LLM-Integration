import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function LinkCheck() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ เพิ่มตัวแปรนี้
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // ✅ เริ่มโหลด

    if (!url.match(/^https:\/\/.*/)) {
      setError(t("error_https"));
      setIsLoading(false); // ✅ หยุดโหลดถ้า URL ไม่ถูกต้อง
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/predict-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: url }),
      });

      const result = await response.json();

      navigate("/Result", {
        state: {
          input_text: result.title,
          newsType: result.prediction,
          probability: result.probability,
          summary: result.summary,
          reasoning: result.reasoning,
          other_links: result.other_links,
          top_content: result.top_content,
          checkMethod: "link",
        },
      });
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false); // ✅ หยุดโหลดเมื่อเสร็จ
    }
  };

  return (
    <>
      <Navbar />
      <div className="linkcheck-container">
        <video
          className="background-video"
          src={bluebg12}
          autoPlay
          loop
          muted
        ></video>

        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b?placeholderIfAbsent=true"
            alt="LinkCheck"
          />
        </div>

        <h1 className="header-title">{t("link_check_title")}</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="url"
              id="website_url"
              placeholder={t("link_check_placeholder")}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="url-input"
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? `${t("verify_button")}...` : t("verify_button")}
          </button>
        </form>
      </div>
    </>
  );
}

export default LinkCheck;
