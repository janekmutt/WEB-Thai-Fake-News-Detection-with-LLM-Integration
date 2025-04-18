import React from "react";
import { motion } from "framer-motion";
import { NewsCheck } from "./Dataselect";
import { useTranslation } from "react-i18next";
import "../App.css";

const SlideLeft = (delay) => ({
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const SelectCheck = ({ items }) => {
  const { t } = useTranslation();

  return (
    <div className="container pb-14 pt-16 ">
      <h1 className="text-4xl font-bold text-left pb-10">
        {t("how_to_verify_news")}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={SlideLeft(index * 0.5)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-blue-500 transition-all duration-300"
          >
            <a href={item.link}>
              <img
                className="w-16 h-16 mb-4 object-contain"
                src={item.image}
                alt={item.alt}
              />
            </a>
            <div className="text-center">
              <h5 className="text-lg font-semibold mb-2">{item.Title}</h5>
              <p className="text-gray-600 mb-4">{item.Points}</p>
            </div>

            <a
              href={item.link}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              {t("select_button")}
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function InfoOne() {
  const { t } = useTranslation(); // ✅ ใช้เพื่อส่งไป NewsCheck
  const newsData = NewsCheck(t); // ✅ ส่ง t เข้าไป

  return (
    <div
      className="mt-10 flex flex-wrap justify-center items-center gap-10 "
      style={{
        backgroundImage:
          "linear-gradient(to top, #00a0f3, #4ab3f4, #73c4f5, #98d6f7, #bde6f9, #ccedf9, #dcf3fa, #ecf9fc, #eaf8f9, #e8f7f7, #e7f5f4, #e6f4f1,#FFFFFF,#FFFFFF)",
      }}
    >
      <SelectCheck items={newsData} />
    </div>
  );
}

// import React from "react";
// import { motion } from "framer-motion";
// import { NewsCheck } from "./Dataselect"; // Import NewsCheck
// // import { NewsCheck } from "./Dataselect";
// import { Link } from "react-router-dom";
// import "../App.css";

// const SlideLeft = (delay) => ({
//   initial: {
//     opacity: 0,
//     x: 50,
//   },
//   animate: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.3,
//       delay: delay,
//       ease: "easeInOut",
//     },
//   },
// });

// const SelectCheck = ({ items }) => {
//   return (
//     <div className="container pb-14 pt-16 ">
//       <h1 className="text-4xl font-bold text-left pb-10">วิธีตรวจสอบข่าว</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {items.map((item, index) => (
//           <motion.div
//             key={index}
//             variants={SlideLeft(index * 0.5)}
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-blue-500 transition-all duration-300"
//           >
//             <a href={item.link}>
//               <img
//                 className="w-16 h-16 mb-4 object-contain"
//                 src={item.image}
//                 alt={item.alt}
//               />
//             </a>
//             <div className="text-center">
//               <h5 className="text-lg font-semibold mb-2">{item.Title}</h5>
//               <p className="text-gray-600 mb-4">{item.Points}</p>
//             </div>

//             <a
//               href={item.link}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
//             >
//               Select
//               <svg
//                 className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 10"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 5h12m0 0L9 1m4 4L9 9"
//                 />
//               </svg>
//             </a>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function InfoOne() {
//   const newsData = NewsCheck(); // นำข้อมูลจาก NewsCheck
//   return (
//     <div
//       className="mt-10 flex flex-wrap justify-center items-center gap-10 "
//       style={{
//         backgroundImage:
//           "linear-gradient(to top, #00a0f3, #4ab3f4, #73c4f5, #98d6f7, #bde6f9, #ccedf9, #dcf3fa, #ecf9fc, #eaf8f9, #e8f7f7, #e7f5f4, #e6f4f1,#FFFFFF,#FFFFFF)",
//       }}
//     >
//       <SelectCheck items={newsData} />
//     </div>
//   );
// }

// import React from "react";
// import { NewsCheck } from "./Dataselect";
// import { Link } from "react-router-dom";
// import "../App.css";
// import { motion } from "framer-motion";

// const ServicesData = [
//   {
//     id: 1,
//     title: "Web Development",
//     link: "#",
//     icon: <TbWorldWww />,
//     delay: 0.2,
//   },
//   {
//     id: 2,
//     title: "Mobile development",
//     link: "#",
//     icon: <CiMobile3 />,
//     delay: 0.3,
//   },
//   {
//     id: 3,
//     title: "Software development",
//     link: "#",
//     icon: <RiComputerLine />,
//     delay: 0.4,
//   },
// ];

// const SlideLeft = (delay) => {
//   return {
//     initial: {
//       opacity: 0,
//       x: 50,
//     },
//     animate: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.3,
//         delay: delay,
//         ease: "easeInOut",
//       },
//     },
//   };
// };
// const Services = () => {
//   return (
//     <section className="bg-white">
//       <div className="container pb-14 pt-16">
//         <h1 className="text-4xl font-bold text-left pb-10">
//           Services we provide
//         </h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
//           {ServicesData.map((service) => (
//             <motion.div
//               variants={SlideLeft(service.delay)}
//               initial="initial"
//               whileInView={"animate"}
//               viewport={{ once: true }}
//               className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl"
//             >
//               <div className="text-4xl mb-4"> {service.icon}</div>
//               <h1 className="text-lg font-semibold text-center px-3">
//                 {service.title}
//               </h1>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

// function SelectCheck({ item }) {
//   return (
//     <div className="selectcheck-card">
//       <a href="#">
//         <img className="rounded-t-lg" src={item.image} alt={item.alt} />
//       </a>
//       <div className="selectcheck-card-body">
//         <a href="#">
//           <h5 className="selectcheck-card-title">{item.Title}</h5>
//         </a>
//         <p className="selectcheck-card-description">{item.Points}</p>
//       </div>
//       <div className="selectcheck-card-footer">
//         <a href={item.link} className="selectcheck-card-button">
//           Select
//           <svg
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 10"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 5h12m0 0L9 1m4 4L9 9"
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// }

// function InfoOne() {
//   const newsData = NewsCheck();
//   return (
//     <div className="mt-10 flex flex-wrap justify-center items-center gap-10">
//       {newsData.map((item, index) => (
//         <SelectCheck key={index} item={item} />
//       ))}
//     </div>
//   );
// }

// export default InfoOne;

/////////////////////////////////////////////////////////////////////

// import React from "react";
// import { NewsCheck } from "./Dataselect";
// import { Link } from "react-router-dom";
// import "../App.css";

// function SelectCheck({ item }) {
//   return (
//     <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
//       <a href="#">
//         <img
//           style={{ width: "100%", height: "200px" }}
//           className="rounded-t-lg"
//           src={item.image}
//           alt={item.alt}
//         />
//       </a>
//       <div className="p-5 flex-grow">
//         <a href="#">
//           <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//             {item.Title}
//           </h5>
//         </a>
//         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//           {item.Points}
//         </p>
//       </div>
//       <div className="p-5">
//         <a
//           href={item.link}
//           className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Select
//           <svg
//             className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 14 10"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M1 5h12m0 0L9 1m4 4L9 9"
//             />
//           </svg>
//         </a>
//       </div>
//     </div>
//   );
// }

// function InfoOne() {
//   const newsData = NewsCheck();
//   return (
//     <div className="mt-10  flex flex-wrap justify-center items-center gap-10 ">
//       {newsData.map((item, index) => (
//         <SelectCheck key={index} item={item} />
//       ))}
//     </div>
//   );
// }

// export default InfoOne;
