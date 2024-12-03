import React from "react";
import { NewsCheck } from "./Dataselect";
import { Link } from "react-router-dom";
import "../App.css";

function SelectCheck({ item }) {
  return (
    <div className="selectcheck-card">
      <a href="#">
        <img className="rounded-t-lg" src={item.image} alt={item.alt} />
      </a>
      <div className="selectcheck-card-body">
        <a href="#">
          <h5 className="selectcheck-card-title">{item.Title}</h5>
        </a>
        <p className="selectcheck-card-description">{item.Points}</p>
      </div>
      <div className="selectcheck-card-footer">
        <a href={item.link} className="selectcheck-card-button">
          Select
          <svg
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
      </div>
    </div>
  );
}

function InfoOne() {
  const newsData = NewsCheck();
  return (
    <div className="mt-10 flex flex-wrap justify-center items-center gap-10">
      {newsData.map((item, index) => (
        <SelectCheck key={index} item={item} />
      ))}
    </div>
  );
}

export default InfoOne;

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
