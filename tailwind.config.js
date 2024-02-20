export default {
  content: ["./index.html", "./components/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aiChatBg: "#035A9D",
        userChatBg: "#65DA65",
        bodyBg: "#ffffff",
        borderColor: "#586E88",
        txtAreaBg: "#F5F5F5",
        userTxt: "#333333",
        boxShadow: "rgb(248 113 113/ 0.5)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        slideRight: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "100% 100%",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "100% 100%",
          },
        },
        slideLeft: {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "0% 0%",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "0% 0%",
          },
        },
      },
      animation: {
        slideRight: "slideRight .3s ease 0s 1 normal forwards",
        slideLeft: "slideLeft .3s ease 0s 1 normal forwards",
        fade: "fadeIn .5s 1s ease-out forwards",
      },
    },
  },
  plugins: [require("daisyui")],
};
