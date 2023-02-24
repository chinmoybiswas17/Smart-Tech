/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorstheme: {
          primary: "#08c",
          secondary: "#0077b2",
          accent: "#f6f7f9",
          productBg: "#e5e4e2",
          pinky: "#eb2771",
          font1: "#313131",
          font2: "#777",
          "neutral": "#e5e4e2",
          "base-100": "#FFFFFF",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
