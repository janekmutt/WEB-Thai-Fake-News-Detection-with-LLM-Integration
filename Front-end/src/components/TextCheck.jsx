// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import "../App.css";

// function TextCheck() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Navbar />

//       {/* <div className="container mx-auto text-center">
//         <div className="flex justify-center items-center space-x-8 mt-8">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="TextCheck"
//             className="w-36 h-36 object-cover"
//           />
//         </div>
//         <div className="container mx-auto text-center">
//           <h1
//             className="text-5xl font-extrabold text-center"
//             style={{
//               // position: "absolute",
//               // left: "450px", // ระยะจากด้านซ้าย
//               // top: "298px", // ระยะจากด้านบน
//               position: "absolute",
//               top: "380px",
//               left: "50%",
//               transform: "translate(-50%, -50%)", // ใช้เพื่อเลื่อนข้อความให้ตรงกลาง
//             }}
//           >
//             ตรวจสอบข่าว
//           </h1>
//         </div>
//         <form className="flex flex-col items-center justify-center w-full max-w-[1047px] mt-32 max-md:mt-20 space-y-8">
//           <label htmlFor="newsContent" className="sr-only">
//             พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ
//           </label>
//           <textarea
//             id="newsContent"
//             className="px-14 pt-9 pb-44 w-full font-extralight bg-white border-black border-solid border-[3px] rounded-[50px] text-neutral-500 max-md:px-5 max-md:pb-28"
//             placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
//             aria-label="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ"
//           />
//         </form>
//       </div> */}
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         {/* โลโก้ */}
//         <div className="mb-8">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="TextCheck"
//             className="w-36 h-36 object-cover"
//           />
//         </div>

//         {/* หัวข้อ */}
//         <h1 className="text-5xl font-extrabold mb-8">ตรวจสอบข่าว</h1>

//         {/* กล่องข้อความ */}
//         <form className="w-full max-w-[1047px]">
//           <label htmlFor="newsContent" className="sr-only">
//             พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ
//           </label>
//           <textarea
//             id="newsContent"
//             className="px-14 pt-9 pb-44 w-full font-extralight bg-white border-black border-solid border-[3px] rounded-[50px] text-neutral-500 max-md:px-5 max-md:pb-28"
//             placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
//           />
//         </form>

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

// export default TextCheck;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

function TextCheck() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="textcheck-container">
        {/* โลโก้ */}
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
            alt="TextCheck"
          />
        </div>

        {/* หัวข้อ */}
        <h1 className="header-title">ตรวจสอบข่าว</h1>

        {/* กล่องข้อความ */}
        <form className="form-container">
          <label htmlFor="newsContent" className="sr-only">
            พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ
          </label>
          <textarea
            id="newsContent"
            className="textarea"
            placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
          />
        </form>

        <Link to="/Result" className="submit-button">
          ตรวจสอบข่าว
        </Link>
      </div>
    </>
  );
}

export default TextCheck;
