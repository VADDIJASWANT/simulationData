/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        cream:'#FFF7ED'
      },
      boxShadow:{
        DropDown: '0 0 5px 1px #d3d3d3 inset'
      }
    },
  },
  plugins: [],
}

