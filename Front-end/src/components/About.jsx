// import React from "react";
// import Navbar from "./Navbar";
// import "../App.css";

// function About() {
//   return (
//     <>
//       <Navbar />
//       <main className=" flex overflow-hidden flex-col font-bold whitespace-nowrap bg-white">
//         <section
//           className="flex relative flex-col items-center px-20 pt-36 pb-72 w-full text-5xl min-h-[920px] text-zinc-900 max-md:px-5 max-md:py-24 max-md:max-w-full max-md:text-4xl"
//           role="region"
//           aria-label="About Us Section"
//         >
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/5587dc42420e498758513fb4530651f0d144a6925f279bcd8ce089b07796ab10?placeholderIfAbsent=true&apiKey=29c095f8129d4027a45c332c76e3f7d7"
//             alt=""
//             className="object-cover absolute inset-0 size-full"
//           />
//           <div className="flex relative flex-col mb-0 w-full max-w-[1196px] rounded-3xlmax-md:mb-2.5 max-md:max-w-full max-md:text-4xl">
//             <h1 className="px-4 pt-3 pb-6 bg-blue-300 rounded-3xl max-md:pr-5 max-md:max-w-full max-md:text-4xl">
//               เกี่ยวกับเรา
//             </h1>
//             <div className="flex shrink-0 mt-6 w-full rounded-3xl bg-neutral-100 h-[375px]" />
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

// export default About;

import React from "react";
import Navbar from "./Navbar";
import "../App.css";
import { useTranslation } from "react-i18next";

function About() {
  return (
    <>
      <Navbar />
      <main className="about-container">
        <section
          className="about-section"
          role="region"
          aria-label="About Us Section"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5587dc42420e498758513fb4530651f0d144a6925f279bcd8ce089b07796ab10?placeholderIfAbsent=true&apiKey=29c095f8129d4027a45c332c76e3f7d7"
            alt="About Us"
            className="about-image"
          />
          <div className="about-header">
            <h1 className="about-header-text">เกี่ยวกับเรา</h1>
            <div className="about-box" />
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
