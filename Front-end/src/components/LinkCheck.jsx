import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function LinkCheck() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        if (remaining <= 0) clearInterval(timer);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isLoading, targetTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const start = performance.now();
    setTargetTime(start + 15000); // คาดการณ์ 15 วินาที

    if (!url.match(/^https:\/\/.*/)) {
      setError(t("error_https"));
      setIsLoading(false);
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

      const end = performance.now();
      const elapsed = ((end - start) / 1000).toFixed(1);
      setCountdown(0);

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
          elapsedTime: elapsed,
        },
      });
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      setError(t("server_error"));
      setCountdown(0);
    } finally {
      setIsLoading(false);
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
        />
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b"
            alt="LinkCheck"
          />
        </div>

        <h1 className="header-title">{t("link_check_title")}</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="modern-input-wrapper">
            <textarea
              className="modern-textarea"
              placeholder={t("link_check_placeholder")}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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

export default LinkCheck;
