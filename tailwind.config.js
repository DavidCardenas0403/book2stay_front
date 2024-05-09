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
        primary: "#293D9B",
        "primary-normal" : "#293D9B",
        "primary-hover" : "#697797",
        "primary-focus" : "#2563eb",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
