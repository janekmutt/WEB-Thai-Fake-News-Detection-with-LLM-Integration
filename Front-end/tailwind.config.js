/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        custom: "1440px", // ความกว้างของหน้าจอที่ต้องการ
      },
      height: {
        custom: "1024px", // ความสูงที่ต้องการ
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
    plugins: [],
  },
};
