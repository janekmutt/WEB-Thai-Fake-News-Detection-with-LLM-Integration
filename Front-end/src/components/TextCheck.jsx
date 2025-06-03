import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function TextCheck() {
  const [newsContent, setNewsContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let timer;
    if (isLoading && targetTime) {
      timer = setInterval(() => {
        const remaining = Math.max(
          0,
          ((targetTime - performance.now()) / 1000).toFixed(1)
        );
        setCountdown(parseFloat(remaining));
        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isLoading, targetTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCountdown(null);

    const start = performance.now();
    setTargetTime(start + 15000); // ตั้งเวลาคร่าว ๆ ไว้ก่อน เช่น 15 วินาที

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newsContent }),
      });

      const end = performance.now();
      const realElapsed = ((end - start) / 1000).toFixed(1); // วินาทีจริง
      setCountdown(0); // หยุด countdown

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
          elapsedTime: realElapsed,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "เกิดข้อผิดพลาด");
      setCountdown(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="textcheck-container">
        <video
          className="background-video"
          src={bluebg12}
          autoPlay
          loop
          muted
        />
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25"
            alt="TextCheck"
          />
        </div>

        <h1 className="header-title">{t("text_check_title")}</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="modern-input-wrapper">
            <textarea
              className="modern-textarea"
              placeholder={t("text_check_placeholder")}
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              required
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button
              type="submit"
              className="modern-input-button"
              disabled={isLoading}
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/sent.png"
                alt="send"
              />
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {isLoading && countdown !== null && (
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.95rem",
                color: "#555",
                textAlign: "center",
              }}
            >
              {t("please_wait")}... ({countdown.toFixed(1)} {t("seconds")})
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default TextCheck;
