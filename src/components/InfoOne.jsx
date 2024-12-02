import React from "react";
import { NewsCheck } from "./Dataselect";
import { Link } from "react-router-dom";
import "../App.css";

function SelectCheck({ item }) {
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
      <a href="#">
        <img
          style={{ width: "100%", height: "200px" }}
          className="rounded-t-lg"
          src={item.image}
          alt={item.alt}
        />
      </a>
      <div className="p-5 flex-grow">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.Title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.Points}
        </p>
      </div>
      <div className="p-5">
        <a
          href={item.link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Select
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
    // <div className="contrainer mx-auto flex items-center py-16">
    //   <div className="w-1/2">
    //     <img
    //       src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
    //       alt="TextCheck"
    //       className="w-36 h-36 object-cover"
    //     />
    //   </div>
    //   <div className="w-1/2 px-6">
    //     <h2 className="text-3xl front-semibold">ข้อความสำหรับตรวจสอบข่าว</h2>
    //     <p className="text-gray-600 mt-4">
    //       พิมพ์ข้อความ หรือใส่ข้อความเพื่อตรวจสอบข่าว
    //     </p>
    //   </div>
    // </div>

    // <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    //   <a href="#">
    //     <img
    //       class="rounded-t-lg"
    //       src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
    //       alt="TextCheck"
    //     />
    //   </a>
    //   <div class="p-5">
    //     <a href="#">
    //       <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //         ข้อความสำหรับตรวจสอบข่าว
    //       </h5>
    //     </a>
    //     <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
    //       พิมพ์ข้อความ หรือใส่ข้อความเพื่อตรวจสอบข่าว
    //     </p>
    //     <a
    //       href="#"
    //       class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     >
    //       select
    //       <svg
    //         class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 14 10"
    //       >
    //         <path
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M1 5h12m0 0L9 1m4 4L9 9"
    //         />
    //       </svg>
    //     </a>
    //   </div>
    // </div>
    <div className="mt-10  flex flex-wrap justify-center items-center gap-10 ">
      {newsData.map((item, index) => (
        <SelectCheck key={index} item={item} />
      ))}
    </div>
  );
}

export default InfoOne;
