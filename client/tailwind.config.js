/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
