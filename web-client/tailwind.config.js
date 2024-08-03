/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "780px" },
        // tablet: {min: "780px", max: "1000px"},
      },
      colors: {
        primary: "#F97535",
        secondary: "#71788B",
        background: "#ffffff",
        foreground: "#eef0f4",
        front: "#000000",
        back: "#ffffff",
        black: {
          1: "#15171C",
          2: "#222429", //border
          3: "#101114", //bg2
          4: "#252525",
          5: "#2E3036",
          6: "#252134", //border
          7: "#1B1F29", //input
          8: "#0E0C15", //bg1
        },
      },
      borderRadius: {
        inherit: "inherit",
      },
      transitionDuration: {
        inherit: "inherit",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        raleway: '"Raleway", sans-serif',
        kablammo: '"Kablammo", sans-serif',
        redRose: '"Red Rose", sans-serif',
        cabin: '"Cabin", sans-serif',
        inter: '"Inter", sans-serif',
        openSans: '"Open Sans", sans-serif',
      },
      zIndex: {
        1: 1,
      },
      gridTemplateColumns: {
        "auto-fit-250": "repeat(auto-fit, minmax(250px, 1fr))",
      },
      backgroundImage: {
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
      },
    },
  },
  plugins: [],
};
