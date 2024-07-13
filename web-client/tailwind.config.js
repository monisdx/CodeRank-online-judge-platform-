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
          2: "#222429",
          3: "#101114",
          4: "#252525",
          5: "#2E3036",
          6: "#252134",
          7: "#1B1F29",
          8: "#0E0C15",
        },
        white: {
          1: "#FFFFFF",
          2: "rgba(255, 255, 255, 0.72)",
          3: "rgba(255, 255, 255, 0.4)",
          4: "rgba(255, 255, 255, 0.64)",
          5: "rgba(255, 255, 255, 0.80)",
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
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
    },
  },
  plugins: [],
};
