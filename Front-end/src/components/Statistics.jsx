// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import StatNews from "../assets/StatNews.png";
// import "../App.css";
// import bluebg10 from "../assets/bluebg10.png";

// const Statistics = () => {
//   const [visitors, setVisitors] = useState(0);
//   const [checkedNewsCount, setCheckedNewsCount] = useState(0);

//   const [animatedVisitors, setAnimatedVisitors] = useState(0);
//   const [animatedCheckedNewsCount, setAnimatedCheckedNewsCount] = useState(0);

//   useEffect(() => {
//     const savedVisitors = localStorage.getItem("visitorsCount");
//     let newVisitorsCount;

//     if (!localStorage.getItem("hasUpdated")) {
//       newVisitorsCount = savedVisitors ? parseInt(savedVisitors) + 1 : 1;
//       localStorage.setItem("visitorsCount", newVisitorsCount);
//       localStorage.setItem("hasUpdated", true);
//     } else {
//       newVisitorsCount = parseInt(savedVisitors);
//     }

//     setVisitors(newVisitorsCount);

//     const savedCheckedNews = localStorage.getItem("checkedNewsCount");
//     setCheckedNewsCount(savedCheckedNews ? parseInt(savedCheckedNews) : 0);

//     return () => {
//       localStorage.removeItem("hasUpdated");
//     };
//   }, []);

//   useEffect(() => {
//     const animateValue = (start, end, duration, setState) => {
//       let startTime = null;

//       const step = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const progress = Math.min((timestamp - startTime) / duration, 1);
//         setState(Math.floor(progress * (end - start) + start));

//         if (progress < 1) {
//           window.requestAnimationFrame(step);
//         }
//       };

//       window.requestAnimationFrame(step);
//     };

//     animateValue(0, visitors, 2000, setAnimatedVisitors);
//     animateValue(0, checkedNewsCount, 2000, setAnimatedCheckedNewsCount);
//   }, [visitors, checkedNewsCount]);

//   const stats = [
//     { number: animatedVisitors, labelTh: "ผู้เข้าชม" },
//     { number: animatedCheckedNewsCount, labelTh: "ตรวจสอบแล้ว" },
//   ];

//   return (
//     <div
//       className="mx-auto bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url(${bluebg10})`,
//       }}
//     >
//       <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between justify-center bg-White to-cyan-400 text-black py-10 pt-120 ">
//         <div className="md:w-1/2 relative flex justify-center items-end">
//           <motion.img
//             initial={{ x: 0, opacity: 0 }}
//             animate={{ x: 50, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
//             src={StatNews}
//             alt="StatNews"
//             className="w-full max-w-[800px] h-auto"
//           ></motion.img>
//         </div>
//         <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-8 lg:mt-8 mt-10 text-center">
//           <h1 className="text-5xl font-bold mt-2">จำนวนการตรวจสอบข้อมูล</h1>
//           <div className="mt-4 flex justify-center space-x-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <p
//                   className="text-8xl font-extrabold"
//                   style={{ color: "#057dcd" }}
//                 >
//                   {stat.number}
//                 </p>
//                 <p className="text-lg mt-2">{stat.labelTh}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import StatNews from "../assets/StatNews.png";
// import "../App.css";
// import bluebg10 from "../assets/bluebg10.png";

// const Statistics = () => {
//   const [visitors, setVisitors] = useState(0);
//   const [checkedNewsCount, setCheckedNewsCount] = useState(0);

//   const [animatedVisitors, setAnimatedVisitors] = useState(0);
//   const [animatedCheckedNewsCount, setAnimatedCheckedNewsCount] = useState(0);

//   const [hasAnimated, setHasAnimated] = useState(false); // ตรวจสอบว่า animation ทำงานหรือยัง
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const savedVisitors = localStorage.getItem("visitorsCount");
//     let newVisitorsCount;

//     if (!localStorage.getItem("hasUpdated")) {
//       newVisitorsCount = savedVisitors ? parseInt(savedVisitors) + 1 : 1;
//       localStorage.setItem("visitorsCount", newVisitorsCount);
//       localStorage.setItem("hasUpdated", true);
//     } else {
//       newVisitorsCount = parseInt(savedVisitors);
//     }

//     setVisitors(newVisitorsCount);

//     const savedCheckedNews = localStorage.getItem("checkedNewsCount");
//     setCheckedNewsCount(savedCheckedNews ? parseInt(savedCheckedNews) : 0);

//     return () => {
//       localStorage.removeItem("hasUpdated");
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !hasAnimated) {
//           setHasAnimated(true); // ตั้งค่าให้ animation ทำงานครั้งเดียว
//         }
//       },
//       { threshold: 0.5 } // เริ่มทำงานเมื่อองค์ประกอบปรากฏ 50%
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [hasAnimated]);

//   useEffect(() => {
//     if (hasAnimated) {
//       const animateValue = (start, end, duration, setState) => {
//         let startTime = null;

//         const step = (timestamp) => {
//           if (!startTime) startTime = timestamp;
//           const progress = Math.min((timestamp - startTime) / duration, 1);
//           setState(Math.floor(progress * (end - start) + start));

//           if (progress < 1) {
//             window.requestAnimationFrame(step);
//           }
//         };

//         window.requestAnimationFrame(step);
//       };

//       animateValue(0, visitors, 2000, setAnimatedVisitors);
//       animateValue(0, checkedNewsCount, 2000, setAnimatedCheckedNewsCount);
//     }
//   }, [hasAnimated, visitors, checkedNewsCount]);

//   const stats = [
//     { number: animatedVisitors, labelTh: "ผู้เข้าชม" },
//     { number: animatedCheckedNewsCount, labelTh: "ตรวจสอบแล้ว" },
//   ];

//   return (
//     <div
//       ref={sectionRef}
//       className="mx-auto bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url(${bluebg10})`,
//       }}
//     >
//       <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between justify-center bg-White to-cyan-400 text-black py-10 pt-120 ">
//         <div className="md:w-1/2 relative flex justify-center items-end">
//           <motion.img
//             initial={{ x: 0, opacity: 0 }}
//             animate={{ x: 50, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
//             src={StatNews}
//             alt="StatNews"
//             className="w-full max-w-[800px] h-auto"
//           ></motion.img>
//         </div>
//         <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-8 lg:mt-8 mt-10 text-center">
//           <h1 className="text-5xl font-bold mt-2">จำนวนการตรวจสอบข้อมูล</h1>
//           <div className="mt-4 flex justify-center space-x-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <p
//                   className="text-8xl font-extrabold"
//                   style={{ color: "#057dcd" }}
//                 >
//                   {stat.number}
//                 </p>
//                 <p className="text-lg mt-2">{stat.labelTh}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

// import React, { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import StatNews from "../assets/StatNews.png";
// import "../App.css";
// import bluebg10 from "../assets/bluebg10.png";

// const Statistics = () => {
//   const [visitors, setVisitors] = useState(0);
//   const [checkedNewsCount, setCheckedNewsCount] = useState(0);

//   const [animatedVisitors, setAnimatedVisitors] = useState(0);
//   const [animatedCheckedNewsCount, setAnimatedCheckedNewsCount] = useState(0);

//   const [hasAnimated, setHasAnimated] = useState(false); // ตรวจสอบว่า animation ทำงานหรือยัง
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const savedVisitors = localStorage.getItem("visitorsCount");
//     let newVisitorsCount;

//     if (!localStorage.getItem("hasUpdated")) {
//       newVisitorsCount = savedVisitors ? parseInt(savedVisitors) + 1 : 1;
//       localStorage.setItem("visitorsCount", newVisitorsCount);
//       localStorage.setItem("hasUpdated", true);
//     } else {
//       newVisitorsCount = parseInt(savedVisitors);
//     }

//     setVisitors(newVisitorsCount);

//     const savedCheckedNews = localStorage.getItem("checkedNewsCount");
//     setCheckedNewsCount(savedCheckedNews ? parseInt(savedCheckedNews) : 0);

//     return () => {
//       localStorage.removeItem("hasUpdated");
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !hasAnimated) {
//           setHasAnimated(true); // ตั้งค่าให้ animation ทำงานครั้งเดียว
//         }
//       },
//       { threshold: 0.5 } // เริ่มทำงานเมื่อองค์ประกอบปรากฏ 50%
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, [hasAnimated]);

//   useEffect(() => {
//     if (hasAnimated) {
//       const animateValue = (start, end, duration, setState) => {
//         let startTime = null;

//         const step = (timestamp) => {
//           if (!startTime) startTime = timestamp;
//           const progress = Math.min((timestamp - startTime) / duration, 1);
//           setState(Math.floor(progress * (end - start) + start));

//           if (progress < 1) {
//             window.requestAnimationFrame(step);
//           }
//         };

//         window.requestAnimationFrame(step);
//       };

//       animateValue(0, visitors, 2000, setAnimatedVisitors);
//       animateValue(0, checkedNewsCount, 2000, setAnimatedCheckedNewsCount);
//     }
//   }, [hasAnimated, visitors, checkedNewsCount]);

//   const stats = [
//     { number: animatedVisitors, labelTh: "ผู้เข้าชม" },
//     { number: animatedCheckedNewsCount, labelTh: "ตรวจสอบแล้ว" },
//   ];

//   return (
//     <div
//       ref={sectionRef}
//       className="mx-auto bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: `url(${bluebg10})`,
//       }}
//     >
//       <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between justify-center bg-White to-cyan-400 text-black py-10 pt-120 ">
//         <motion.div
//           className="md:w-1/2 relative flex justify-center items-end"
//           initial={{ x: 0, opacity: 0 }}
//           animate={hasAnimated ? { x: 50, opacity: 1 } : {}} // เริ่ม animation เมื่อเลื่อนมาถึง
//           transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
//         >
//           <img
//             src={StatNews}
//             alt="StatNews"
//             className="w-full max-w-[800px] h-auto"
//           />
//         </motion.div>
//         <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-8 lg:mt-8 mt-10 text-center">
//           <h1 className="text-5xl font-bold mt-2">จำนวนการตรวจสอบข้อมูล</h1>
//           <div className="mt-4 flex justify-center space-x-20">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <p
//                   className="text-8xl font-extrabold"
//                   style={{ color: "#057dcd" }}
//                 >
//                   {stat.number}
//                 </p>
//                 <p className="text-lg mt-2">{stat.labelTh}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Statistics;

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import StatNews from "../assets/StatNews.png";
import "../App.css";
import bluebg10 from "../assets/bluebg10.png";
import { useTranslation } from "react-i18next"; // ✅ เพิ่ม

const Statistics = () => {
  const { t } = useTranslation(); // ✅ ใช้สำหรับแปล
  const [visitors, setVisitors] = useState(0);
  const [checkedNewsCount, setCheckedNewsCount] = useState(0);
  const [animatedVisitors, setAnimatedVisitors] = useState(0);
  const [animatedCheckedNewsCount, setAnimatedCheckedNewsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const savedVisitors = localStorage.getItem("visitorsCount");
    let newVisitorsCount;

    if (!localStorage.getItem("hasUpdated")) {
      newVisitorsCount = savedVisitors ? parseInt(savedVisitors) + 1 : 1;
      localStorage.setItem("visitorsCount", newVisitorsCount);
      localStorage.setItem("hasUpdated", true);
    } else {
      newVisitorsCount = parseInt(savedVisitors);
    }

    setVisitors(newVisitorsCount);

    const savedCheckedNews = localStorage.getItem("checkedNewsCount");
    setCheckedNewsCount(savedCheckedNews ? parseInt(savedCheckedNews) : 0);

    return () => {
      localStorage.removeItem("hasUpdated");
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const animateValue = (start, end, duration, setState) => {
        let startTime = null;

        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          setState(Math.floor(progress * (end - start) + start));

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      };

      animateValue(0, visitors, 2000, setAnimatedVisitors);
      animateValue(0, checkedNewsCount, 2000, setAnimatedCheckedNewsCount);
    }
  }, [hasAnimated, visitors, checkedNewsCount]);

  const stats = [
    { number: animatedVisitors, labelKey: "stat_visitors" },
    { number: animatedCheckedNewsCount, labelKey: "stat_checked" },
  ];

  return (
    <div
      ref={sectionRef}
      className="mx-auto bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bluebg10})`,
      }}
    >
      <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between justify-center bg-White to-cyan-400 text-black py-10 pt-120 ">
        <motion.div
          className="md:w-1/2 relative flex justify-center items-end"
          initial={{ x: 0, opacity: 0 }}
          animate={hasAnimated ? { x: 50, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
        >
          <img
            src={StatNews}
            alt="StatNews"
            className="w-full max-w-[800px] h-auto"
          />
        </motion.div>
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-8 lg:mt-8 mt-10 text-center">
          <h1 className="text-5xl font-bold mt-2">{t("stat_header")}</h1>
          <div className="mt-4 flex justify-center space-x-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p
                  className="text-8xl font-extrabold"
                  style={{ color: "#057dcd" }}
                >
                  {stat.number}
                </p>
                <p className="text-lg mt-2">{t(stat.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
