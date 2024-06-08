/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xl: { max: "1200px" },
      lg: { max: "1080px" },
      "md-lg": { max: "991px" },
      md: { max: "768px" },
      sm: { max: "576px" },
      xs: { max: "480px" },
      "2xs": { max: "340px" },
    },
    rotate: {
      "-30": "-30deg",
      "-40": "-40deg",
      "-50": "-50deg",
      "-60": "-60deg",
      "-70": "-70deg",
    },
  },
  plugins: [],
  variants: {
    scrollbar: ["rounded"],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
