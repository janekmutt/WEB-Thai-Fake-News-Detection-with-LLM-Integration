import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

function LinkCheck() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="linkcheck-container">
        {/* โลโก้ */}
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
            alt="LinkCheck"
          />
        </div>

        {/* หัวข้อ */}
        <h1 className="header-title">URL เพื่อตรวจสอบข่าว</h1>

        {/* กล่องข้อความ */}
        <form className="form-container">
          <input
            type="url"
            id="website_url"
            placeholder="โปรดวาง URL"
            pattern="https://.*"
            size="30"
            required
            className="url-input"
          />
        </form>

        <Link to="/Result" className="submit-button">
          ตรวจสอบข่าว
        </Link>
      </div>
    </>
  );
}

export default LinkCheck;

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import "../App.css";

// import Navbar from "./Navbar";

// function LinkCheck() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center h-screen text-center">
//         {/* โลโก้ */}
//         <div className="mb-8">
//           <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
//             alt="LinkCheck"
//             className="w-36 h-36 object-cover"
//           />
//         </div>
//         {/* หัวข้อ */}
//         <h1 className="text-5xl font-extrabold mb-8">URL เพื่อตรวจสอบข่าว</h1>

//         {/* กล่องข้อความ */}
//         {/* <div class="relative mb-3" data-twe-input-wrapper-init>
//           <input
//             type="url"
//             class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
//             id="exampleFormControlInputURL"
//             placeholder="Example label"
//           />
//           <label
//             for="exampleFormControlInputURL"
//             class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
//           >
//             URL input
//           </label>
//         </div> */}

//         <form className="w-full max-w-[1047px]">
//           <input
//             type="url"
//             id="website_url"
//             placeholder="โปรดวาง URL"
//             pattern="https://.*"
//             size="30"
//             required
//             className="px-14 pt-9 pb-44 w-[1000px] font-extralight bg-white border-black border-solid border-[3px] rounded-[50px] text-neutral-500 max-md:px-5 max-md:pb-28"
//           ></input>
//           {/* <label htmlFor="newsContent" className="sr-only">
//             พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ
//           </label>
//           <textarea
//             id="newsContent"
//             className="px-14 pt-9 pb-44 w-full font-extralight bg-white border-black border-solid border-[3px] rounded-[50px] text-neutral-500 max-md:px-5 max-md:pb-28"
//             placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
//             aria-label="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ"
//           /> */}
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

// export default LinkCheck;
