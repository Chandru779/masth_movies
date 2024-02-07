/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lackerli: ["lackerli One", "cursive"],
        inter: ["inter", "sans"],
      },
      colors: {
        dark: "#0a0908",
        light: "#eae0d5",
        primary: "#92140c",
        secondary: "#001a2c",
        bright: "#22D3EE",
        grey: "#71717A",
      },
    },
  },
  plugins: [],
};
