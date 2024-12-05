/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.{html,js}",
     "./views/**/*.ejs"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}

