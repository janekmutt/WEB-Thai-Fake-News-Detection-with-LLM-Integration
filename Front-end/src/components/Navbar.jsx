import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { NewsCheck } from "./Dataselect";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css";

function Navbar() {
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(i18n.language); // ✅ ผูกสถานะกับภาษา

  const highlightRef = useRef(null);
  const thBtnRef = useRef(null);
  const enBtnRef = useRef(null);

  useEffect(() => {
    const highlight = highlightRef.current;
    const targetBtn =
      currentLang === "th" ? thBtnRef.current : enBtnRef.current;
    if (highlight && targetBtn) {
      highlight.style.width = `${targetBtn.offsetWidth}px`;
      highlight.style.left = `${targetBtn.offsetLeft}px`;
    }
  }, [currentLang]);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng); // ✅ update state ทันที
  };

  const BarSelect = NewsCheck(t); // ใช้ t จาก useTranslation

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              {t("home")}
            </Link>
          </li>

          <li className="navbar-item">
            <div className="navbar-link">
              {t("verify_news")}
              <span>
                <FaCaretDown className="dropdown-icon" />
              </span>
            </div>
            <div className="dropdown-content">
              <ul className="dropdown-list">
                {BarSelect.map((item, index) => (
                  <li key={index} className="dropdown-item">
                    <a href={item.link} className="dropdown-link">
                      <img src={item.image} alt={item.alt} />
                      <span>{item.Title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="navbar-item">
            <Link to="/About" className="navbar-link">
              {t("about_us")}
            </Link>
          </li>
        </ul>

        {/* ปุ่มภาษา TH/ENG */}
        <div className="lang-toggle">
          <div className="lang-highlight" ref={highlightRef}></div>
          <button
            ref={thBtnRef}
            className={`lang-btn ${currentLang === "th" ? "active" : ""}`}
            onClick={() => switchLanguage("th")}
          >
            TH
          </button>
          <button
            ref={enBtnRef}
            className={`lang-btn ${currentLang === "en" ? "active" : ""}`}
            onClick={() => switchLanguage("en")}
          >
            ENG
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// import React from "react";
// import { FaCaretDown } from "react-icons/fa";
// import { NewsCheck } from "./Dataselect";
// import { Link } from "react-router-dom";
// import "../App.css";

// function Navbar() {
//   const BarSelect = NewsCheck();

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <ul className="navbar-menu">
//           {/* เมนู "หน้าหลัก" */}
//           <li className="navbar-item">
//             <Link to="/" className="navbar-link">
//               หน้าหลัก
//             </Link>
//           </li>

//           {/* เมนู Dropdown */}
//           <li className="navbar-item">
//             <div className="navbar-link">
//               ตรวจข่าว
//               <span>
//                 <FaCaretDown className="dropdown-icon" />
//               </span>
//             </div>
//             <div className="dropdown-content">
//               <ul className="dropdown-list">
//                 {BarSelect.map((item, index) => (
//                   <li key={index} className="dropdown-item">
//                     <a href={item.link} className="dropdown-link">
//                       <img src={item.image} alt={item.alt} />
//                       <span>{item.Title}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </li>

//           {/* เมนู "เกี่ยวกับเรา" */}
//           <li className="navbar-item">
//             <Link to="/About" className="navbar-link">
//               เกี่ยวกับเรา
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import React from "react";
// import { FaCaretDown } from "react-icons/fa";
// import { NewsCheck } from "./Dataselect";
// import { Link } from "react-router-dom";
// import "../App.css";

// function Navbar() {
//   const BarSelect = NewsCheck();

//   return (
//     <nav className="bg-[#23486B] h-[104px]">
//       <div className="container flex justify-start items-center h-full px-8">
//         <ul className="flex space-x-8">
//           {/* เมนู "หน้าหลัก" */}
//           <li className="cursor-pointer group relative">
//             <Link
//               to="/"
//               className="text-white text-xl py-2 flex items-center gap-2"
//             >
//               หน้าหลัก
//             </Link>
//           </li>

//           {/* เมนู Dropdown */}
//           <li className="cursor-pointer group relative">
//             {/* <a
//               href="#"
//               className="text-white text-xl py-2 flex items-center gap-2"
//             > */}
//             <div className="text-white text-xl flex items-center gap-2 py-2">
//               ตรวจข่าว
//               <span>
//                 <FaCaretDown className="group-hover:rotate-180 duration-300" />
//               </span>
//             </div>
//             {/* </a> */}

//             {/* Dropdown Content */}
//             {/* <div className="absolute z-[9999] hidden group-hover:block w-[200px] bg-white shadow-md rounded-lg mt-2 w-48 p-2"> */}
//             <div className="absolute z-[9999] hidden group-hover:block w-[300px] bg-white shadow-md rounded-lg p-2">
//               <ul className="py-2">
//                 {BarSelect.map((item, index) => (
//                   <li key={index} className="hover:bg-sky-600 rounded-md">
//                     <a
//                       href={item.link}
//                       className="flex items-center gap-4 px-4 py-2 text-black hover:text-white text-lg"
//                     >
//                       {/* รูปภาพ */}
//                       <img
//                         src={item.image}
//                         alt={item.alt}
//                         className="w-8 h-8 object-cover rounded"
//                       />
//                       {/* ข้อความ */}
//                       <span>{item.Title}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </li>

//           {/* เมนู "เกี่ยวกับเรา" */}
//           <li>
//             <Link
//               to="/About"
//               className="text-white text-xl py-2 flex items-center gap-2"
//             >
//               เกี่ยวกับเรา
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
