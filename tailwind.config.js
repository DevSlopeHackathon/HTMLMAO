/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:          {
        "--red": "#c21804",
        "--orange": "#d8470b",
        "--yellow": "#f5c600",
        "--green": "#758c32",
        "--blue": "#007291",
        "--purple": "#9d01cc",
        "--brown": "#9b4923",
        "--black": "#000000",
      }
    },
  },
  plugins: [],
}

