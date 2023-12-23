/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      backgroundColor: {
        gr: "#0A7777",
      },
      fontFamily: {
        sans: ['"Istok Web"', "sans-serif"],
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        show: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { transform: "translateX(calc(100% + 10px))" },
          to: { transform: "translateX(0))" },
        },
        swipeOut: {
          from: { transform: "translateX(10px)" },
          to: { transform: "translateX(calc(100% + 10px))" },
        },
        down: {
          from: { opacity: 0, top: "2.5em" },
          to: { opacity: 1, top: "50%" },
        },
        errorAni: {
          from: { opacity: 0, top: "3rem" },
          to: { opacity: 1, top: "4.1rem" },
        },
        errorAniUp: {
          from: { opacity: 1, top: "4.1rem" },
          to: { opacity: 0, top: "3rem" },
        },
        up: {
          from: { opacity: 1, top: "50%" },
          to: { opacity: 0, top: "2.5em" },
        },
        fundo: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        modal:{
          from: { opacity: 0, transform: "translateY(-60px)" },
          to: {opacity: 1, transform: "translateY(0)" },
        }
      },
      animation: {
        hide: "hide 300ms ease-in-out",
        show: "show 300ms ease-in-out",
        errorAni: "errorAni 300ms ease-in-out forwards",
        errorAniUp: "errorAniUp 300ms ease-in-out forwards",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
        down: "down 300ms ease-in-out",
        up: "up 300ms ease-in-out",
        fundo: "fundo .5s forwards",
        modal: "modal 1s forwards"
      },
    },
  },
  plugins: [],
};
