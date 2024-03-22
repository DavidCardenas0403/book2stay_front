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
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3e9681",
      },
    },
  },
  plugins: [],
};
