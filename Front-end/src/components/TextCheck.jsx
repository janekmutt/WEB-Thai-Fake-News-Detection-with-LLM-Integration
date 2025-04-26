// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// function TextCheck() {
//   const [text, setText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       navigate("/Result", {
//         state: {
//           newsType: result.prediction,
//           probability: result.probability
//         }
//       });

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//         {/* Logo */}
//         <div className="mb-8">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="TextCheck"
//             className="w-36 h-36 object-cover"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="text-5xl font-extrabold mb-8">ตรวจสอบข่าว</h1>

//         {/* Text box */}
//         <form onSubmit={handleSubmit} className="w-full max-w-2xl">
//           <textarea
//             className="w-full px-14 pt-9 pb-44 font-extralight bg-white border-black border-solid border-2 rounded-[50px] text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//             placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />

//           {error && (
//             <div className="mt-4 text-red-600 font-medium">{error}</div>
//           )}

//           <button
//             type="submit"
//             className={`mt-6 bg-red-600 text-white font-extrabold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? "กำลังวิเคราะห์..." : "ตรวจสอบข่าว"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default TextCheck;

// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import bluebg12 from "../assets/bluebg12.mp4";
// import { useTranslation } from "react-i18next";

// function TextCheck() {
//   const [newsContent, setNewsContent] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: newsContent }),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       console.log("Response from server:", result);

//       navigate("/Result", {
//         state: {
//           input_text: newsContent,
//           newsType: result.prediction,
//           probability: result.probability,
//           summary: result.summary,
//         },
//       });
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       setError(error.message || "เกิดข้อผิดพลาด");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="textcheck-container">
//         <video
//           className="background-video"
//           src={bluebg12}
//           autoPlay
//           loop
//           muted
//         />

//         <div className="logo">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true"
//             alt="TextCheck"
//           />
//         </div>

//         <h1 className="header-title">{t("text_check_title")}</h1>

//         <form className="form-container" onSubmit={handleSubmit}>
//           <label htmlFor="newsContent" className="sr-only">
//             {t("text_check_label")}
//           </label>
//           <textarea
//             id="newsContent"
//             className="textarea"
//             placeholder={t("text_check_placeholder")}
//             value={newsContent}
//             onChange={(e) => setNewsContent(e.target.value)}
//             required
//           />

//           {error && <div className="error-message">{error}</div>}

//           <button
//             type="submit"
//             className={`submit-button ${isLoading ? "disabled" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? `${t("verify_button")}...` : t("verify_button")}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default TextCheck;
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
          summary: result.summary, // ส่ง summary ไปยัง Result
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
