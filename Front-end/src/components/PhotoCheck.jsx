// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import "../App.css";
// import bluebg12 from "../assets/bluebg12.mp4";
// import { useTranslation } from "react-i18next";

// function onImageUploadAndPredict(e, setImages, setIsLoading, navigate) {
//   const imageFile = e.target.files[0];
//   if (!imageFile) return;

//   setImages([imageFile]);
//   setIsLoading(true);

//   const formData = new FormData();
//   formData.append("image", imageFile);

//   fetch("http://localhost:5000/ocr-predict", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.error) {
//         console.error("Error from /ocr-predict:", result.error);
//         return;
//       }

//       navigate("/Result", {
//         state: {
//           input_text: result.ocr_text,
//           newsType: result.prediction,
//           probability: result.probability,
//           summary: result.summary,
//           reasoning: result.reasoning,
//           top_content: result.top_content,
//           other_links: result.other_links,
//           checkMethod: "image",
//         },
//       });
//     })
//     .catch((error) => console.error("Error during OCR+Prediction:", error))
//     .finally(() => setIsLoading(false));
// }

// function PhotoCheck() {
//   const [images, setImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageURLs, setImageURLs] = useState([]);
//   const [countdown, setCountdown] = useState(null);
//   const [targetTime, setTargetTime] = useState(null);
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (images.length < 1) return;
//     const newImageUrls = images.map((image) => URL.createObjectURL(image));
//     setImageURLs(newImageUrls);
//   }, [images]);

//   useEffect(() => {
//     let timer;
//     if (isLoading && targetTime) {
//       timer = setInterval(() => {
//         const remaining = Math.max(
//           0,
//           ((targetTime - performance.now()) / 1000).toFixed(1)
//         );
//         setCountdown(parseFloat(remaining));
//         if (remaining <= 0) clearInterval(timer);
//       }, 100);
//     }
//     return () => clearInterval(timer);
//   }, [isLoading, targetTime]);

//   return (
//     <>
//       <Navbar />
//       <div className="photocheck-container">
//         <video
//           className="background-video"
//           src={bluebg12}
//           autoPlay
//           loop
//           muted
//         />

//         <div className="logo">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true"
//             alt="PhotoCheck"
//           />
//         </div>

//         <h1 className="header-title">{t("photo_check_title")}</h1>

//         <div className="upload-section">
//           <label htmlFor="uploadFile1" className="upload-button">
//             <input
//               type="file"
//               id="uploadFile1"
//               accept="image/*"
//               onChange={(e) => {
//                 const start = performance.now();
//                 setTargetTime(start + 15000); // สำหรับ countdown
//                 onImageUploadAndPredict(e, setImages, setIsLoading, navigate);
//               }}
//             />
//             {t("upload_button")}
//           </label>
//         </div>

//         <div className="image-preview">
//           {imageURLs.map((imageSrc, index) => (
//             <img key={index} src={imageSrc} alt={`Preview ${index}`} />
//           ))}
//         </div>

//         {isLoading && countdown !== null && (
//           <p
//             style={{
//               marginTop: "0.75rem",
//               fontSize: "0.95rem",
//               color: "#555",
//               textAlign: "center",
//             }}
//           >
//             {t("please_wait")}... ({countdown.toFixed(1)} {t("seconds")})
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

// export default PhotoCheck;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";
import bluebg12 from "../assets/bluebg12.mp4";
import { useTranslation } from "react-i18next";

function onImageChange(e, setImages, setOcrText, setIsLoading) {
  const imageFile = e.target.files[0];
  setImages([imageFile]);
  setIsLoading(true);

  const formData = new FormData();
  formData.append("image", imageFile);

  fetch("http://localhost:5000/ocr", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ocr_text) {
        setOcrText(data.ocr_text);
      } else {
        console.error("OCR Error: ", data.error);
      }
    })
    .catch((error) => console.error("Error during OCR process:", error))
    .finally(() => setIsLoading(false));
}

function PhotoCheck() {
  const [images, setImages] = useState([]);
  const [ocrText, setOcrText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageURLs, setImageURLs] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);
  }, [images]);

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

  const handleVerifyClick = async () => {
    if (images.length < 1) {
      console.log("No image selected");
      return;
    }

    setIsLoading(true);
    const start = performance.now();
    setTargetTime(start + 15000); // default to 15 seconds

    try {
      const predictResponse = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ocrText }),
      });

      const result = await predictResponse.json();

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

        <div className="upload-section">
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

          <button
            type="submit"
            className="modernup-input-button"
            disabled={isLoading}
            onClick={handleVerifyClick}
          >
            <img
              src="https://img.icons8.com/ios-filled/24/ffffff/sent.png"
              alt="send"
            />
          </button>
        </div>

        <div className="image-preview">
          {imageURLs.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Preview ${index}`} />
          ))}
        </div>

        <div className="ocr-text">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : (
            ocrText && (
              <div className="ocr-textarea-wrapper">
                <textarea
                  className="ocr-textarea"
                  placeholder={t("text_check_placeholder")}
                  value={ocrText}
                  onChange={(e) => setOcrText(e.target.value)}
                  required
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </div>
            )
          )}
        </div>

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
      </div>
    </>
  );
}

export default PhotoCheck;
