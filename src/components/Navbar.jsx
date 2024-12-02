import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { NewsCheck } from "./Dataselect";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  const BarSelect = NewsCheck();

  return (
    <nav className="bg-[#23486B] h-[104px]">
      <div className="container flex justify-start items-center h-full px-8">
        <ul className="flex space-x-8">
          {/* เมนู "หน้าหลัก" */}
          <li className="cursor-pointer group relative">
            <Link
              to="/"
              className="text-white text-xl py-2 flex items-center gap-2"
            >
              หน้าหลัก
            </Link>
          </li>

          {/* เมนู Dropdown */}
          <li className="cursor-pointer group relative">
            {/* <a
              href="#"
              className="text-white text-xl py-2 flex items-center gap-2"
            > */}
            <div className="text-white text-xl flex items-center gap-2 py-2">
              ตรวจข่าว
              <span>
                <FaCaretDown className="group-hover:rotate-180 duration-300" />
              </span>
            </div>
            {/* </a> */}

            {/* Dropdown Content */}
            {/* <div className="absolute z-[9999] hidden group-hover:block w-[200px] bg-white shadow-md rounded-lg mt-2 w-48 p-2"> */}
            <div className="absolute z-[9999] hidden group-hover:block w-[300px] bg-white shadow-md rounded-lg p-2">
              <ul className="py-2">
                {BarSelect.map((item, index) => (
                  <li key={index} className="hover:bg-sky-600 rounded-md">
                    <a
                      href={item.link}
                      className="flex items-center gap-4 px-4 py-2 text-black hover:text-white text-lg"
                    >
                      {/* รูปภาพ */}
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-8 h-8 object-cover rounded"
                      />
                      {/* ข้อความ */}
                      <span>{item.Title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* เมนู "เกี่ยวกับเรา" */}
          <li>
            <Link
              to="/About"
              className="text-white text-xl py-2 flex items-center gap-2"
            >
              เกี่ยวกับเรา
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
