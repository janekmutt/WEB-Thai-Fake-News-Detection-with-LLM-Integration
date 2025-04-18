// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import "../App.css";

// function onImageChange(e, setImages) {
//   setImages([...e.target.files]);
// }

// function PhotoCheck() {
//   const [images, setImages] = useState([]);
//   const [imageURLs, setImageURLs] = useState([]);

//   useEffect(() => {
//     if (images.length < 1) return;
//     const newImageUrls = [];
//     images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
//     setImageURLs(newImageUrls);
//   }, [images]);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         {/* โลโก้ */}
//         <div className="mb-8">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="PhotoCheck"
//             className="w-36 h-36 object-cover"
//           />
//         </div>

//         {/* หัวข้อ */}
//         <h1 className="text-5xl font-extrabold mb-8">
//           อัปโหลดรูปภาพเพื่อตรวจสอบข่าว
//         </h1>

//         {/* Input for file upload */}
//         {/* <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => onImageChange(e, setImages)}
//           className="mb-4"
//         ></input> */}

//         <label
//           for="uploadFile1"
//           class="flex bg-white border-black border-solid border-[3px] rounded-[50px] text-black text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             class="w-6 mr-2 fill-black inline"
//             viewBox="0 0 32 32"
//           >
//             <path
//               d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
//               data-original="#FFFFFF"
//             />
//             <path
//               d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
//               data-original="#FFFFFF"
//             />
//           </svg>
//           อัปโหลดรูปภาพ
//           <input
//             type="file"
//             id="uploadFile1"
//             multiple
//             accept="image/*"
//             class="hidden"
//             onChange={(e) => onImageChange(e, setImages)}
//           />
//         </label>

//         {/* Image preview */}
//         <div className="image-preview">
//           {imageURLs.map((imageSrc, index) => (
//             <img
//               key={index}
//               src={imageSrc}
//               alt={`Preview ${index}`}
//               className="h-[500px] object-cover mb-2 mt-3"
//             />
//           ))}
//         </div>

//         <Link
//           to="/Result"
//           className="bg-red-600 text-white font-extrabold px-6 py-2 rounded-lg mt-3 inline-block hover:bg-red-800"
//         >
//           ตรวจสอบข่าว
//         </Link>
//       </div>
//     </>
//   );
// }

// export default PhotoCheck;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import "../App.css";
// import bluebg12 from "../assets/bluebg12.mp4";

// function onImageChange(e, setImages) {
//   setImages([...e.target.files]);
// }

// function PhotoCheck() {
//   const [images, setImages] = useState([]);
//   const [imageURLs, setImageURLs] = useState([]);

//   useEffect(() => {
//     if (images.length < 1) return;
//     const newImageUrls = [];
//     images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
//     setImageURLs(newImageUrls);
//   }, [images]);

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
//         ></video>
//         <div className="logo">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="PhotoCheck"
//           />
//         </div>

//         {/* หัวข้อ */}
//         <h1 className="header-title">อัปโหลดรูปภาพเพื่อตรวจสอบข่าว</h1>

//         {/* ปุ่มอัปโหลด */}
//         <label htmlFor="uploadFile1" className="upload-button">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="icon"
//             viewBox="0 0 32 32"
//           >
//             <path
//               d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
//               data-original="#FFFFFF"
//             />
//             <path
//               d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
//               data-original="#FFFFFF"
//             />
//           </svg>
//           อัปโหลดรูปภาพ
//           <input
//             type="file"
//             id="uploadFile1"
//             multiple
//             accept="image/*"
//             onChange={(e) => onImageChange(e, setImages)}
//           />
//         </label>

//         {/* แสดงรูปภาพที่อัปโหลด */}
//         <div className="image-preview">
//           {imageURLs.map((imageSrc, index) => (
//             <img key={index} src={imageSrc} alt={`Preview ${index}`} />
//           ))}
//         </div>

//         <Link to="/Result" className="submit-button">
//           ตรวจสอบข่าว
//         </Link>
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

function onImageChange(e, setImages) {
  setImages([...e.target.files]);
}

function PhotoCheck() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);
  }, [images]);

  const handleVerifyClick = async () => {
    // ใช้ข้อความ mock แทน OCR ไปก่อน
    const inputText = "ตัวอย่างข้อความข่าวจากภาพ";

    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text: inputText }),
      });

      const result = await response.json();

      navigate("/Result", {
        state: {
          input_text: result.input_text,
          newsType: result.result_news, // <-- ส่งค่าไป Result.jsx
        },
      });
    } catch (err) {
      console.error("Error predicting news:", err);
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
            multiple
            accept="image/*"
            onChange={(e) => onImageChange(e, setImages)}
          />
          {t("upload_button")}
        </label>

        <div className="image-preview">
          {imageURLs.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt={`Preview ${index}`} />
          ))}
        </div>

        {/* ปุ่มใหม่ที่เรียก handleVerifyClick */}
        <button className="submit-button" onClick={handleVerifyClick}>
          {t("verify_button")}
        </button>
      </div>
    </>
  );
}

export default PhotoCheck;
