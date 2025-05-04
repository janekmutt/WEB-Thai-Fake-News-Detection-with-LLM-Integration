import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function TextCheck() {
  const [newsContent, setNewsContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newsContent }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Response from server:", result);

      // ส่งข้อมูลไปยังหน้า Result รวมทั้ง summary
      navigate("/Result", {
        state: {
          input_text: newsContent,
          newsType: result.prediction,
          probability: result.probability,
          summary: result.summary,
          reasoning: result.reasoning,
          top_content: result.top_content,
          other_links: result.other_links,
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(error.message || "เกิดข้อผิดพลาด");
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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true"
            alt="TextCheck"
          />
        </div>

        <h1 className="header-title">{t("text_check_title")}</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="newsContent" className="sr-only">
            {t("text_check_label")}
          </label>
          <textarea
            id="newsContent"
            className="textarea"
            placeholder={t("text_check_placeholder")}
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}

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

export default TextCheck;
