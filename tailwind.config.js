/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'selector',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          normal: "#293D9B",
          hover: "#697797",
          focus: "#2563eb"
          
        } 
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
