import { motion } from "framer-motion";

const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{
        duration: 0.8, // <-- ปรับตรงนี้ให้ช้าลง (ค่าปกติอาจเป็น 0.3 หรือ 0.5)
        ease: "easeInOut", // หรือลอง "easeOut", "easeIn"
      }}
      className="page-transition"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
