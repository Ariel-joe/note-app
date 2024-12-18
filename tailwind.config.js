/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.{html,js}",
     "./views/**/*.ejs"
  ],
  theme: {
    extend: {

      fontFamily: {
        mont: ["Montserrat", "Arial", "sans-serif"]
      },

    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
}

