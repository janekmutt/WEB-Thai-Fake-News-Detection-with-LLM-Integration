import React from "react";
import Navbar from "./Navbar";
import InfoOne from "./InfoOne";
import Statistics from "./Statistics";
import "../App.css";
import CheckWelcome2 from "../assets/CheckWelcome2.gif";
import Particle from "../components/Particle.jsx";
import { animate, motion } from "framer-motion";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Welcome = () => {
  return (
    <section className="">
      <Navbar />
      <div className="max-w-7xl mx-auto relative ">
        <Particle />
        <div className="flex flex-col md:flex-row items-center lg:h-[90vh] justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col space-y-4 px-6 lg:px-8 lg:mt-8 mt-10">
            <motion.h1
              variants={FadeUp(0.5)}
              initial="initial"
              animate="animate"
              className="lg:text-7xl text-4xl font-bold lg:leading-snug"
            >
              <br /> Real or Fake Thai News ?
            </motion.h1>
            <motion.p
              variants={FadeUp(0.75)}
              initial="initial"
              animate="animate"
              className="md:text-2xl text-xl mb-4"
            >
              ความจริงอยู่แค่ปลายนิ้ว ตรวจสอบข่าวได้ทันทีในไม่กี่คลิก
            </motion.p>
          </div>
          <div className="md:w-1/2 relative flex justify-center items-end">
            <motion.img
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
              src={CheckWelcome2}
              alt="Check Welcome2"
              className="w-full max-w-[800px] h-auto"
            />
          </div>
        </div>
      </div>
      <InfoOne />
      <Statistics />
    </section>
  );
};

export default Welcome;
