/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "780px" },
        widescreen: { min: "1000px" },
        tablet: {min: "780px", max: "1000px"},
      },
      colors: {
        primary: "#f36363 ",
        secondary: "#2E3136",
        background: "#ffffff",
        foreground: "#eef0f4",
        front: "#000000",
        back: "#ffffff",
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
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};
