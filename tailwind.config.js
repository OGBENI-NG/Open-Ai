/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aiChatBg: "#035A9D",
        userChatBg: "#65DA65",
        bodyBg: "#ffffff",
        borderColor: "#586E88",
        txtAreaBg: "#F5F5F5",
        userTxt: "#333333",
        boxShadow: "rgba(0, 128, 0, 0.14)"
      },
      fontFamily: {
        roboto:  ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [require("daisyui")],
}