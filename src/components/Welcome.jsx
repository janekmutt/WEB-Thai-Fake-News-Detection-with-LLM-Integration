import React from "react";
import Navbar from "./Navbar";
import InfoOne from "./InfoOne";
import "../App.css";

function Welcome() {
  return (
    <>
      <Navbar />
      <div className=" bg-sky-100 text-black h-[300px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Real or Fake Thai News ?</h1>
          <p className="text-lg mt-4">ทุกคนสามารถตรวจสอบข่าวได้</p>
        </div>
      </div>

      {/* <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-8 mt-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
              alt="TextCheck"
              className="w-36 h-36 object-cover"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fffe51a59cb3f9c28051833d3d122d47bafc8a1825840f55ef306edb9297152?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
              alt="PhotoCheck"
              className="w-36 h-36 object-cover"
            />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9c8698ccd0ec2c1bd2d7a639ab14e9df3ac6326f91cc810e39a660f782db66b?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
              alt="LinkCheck"
              className="w-36 h-36 object-cover"
            />
          </div>
        </div> */}

      <InfoOne />
    </>
  );
}

export default Welcome;
