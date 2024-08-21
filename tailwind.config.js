/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        ground: "#FAF7EE",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fbbf24",
          secondary: "#00b44a",
          accent: "#0099db",
          neutral: "#080f0e",
          "base-100": "#f3f4f6",
          info: "#00abf0",
          success: "#00e5ab",
          warning: "#fb923c",
          error: "#e11d48",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
