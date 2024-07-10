// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#09092d",
        blue: "#1e1a84",
        purple: "#411a8d",
        pink: "#703b94",
        white: "#f2f1ed"
      },
      animation: {
        flip: 'flip 0.6s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animations'),
  ],
};
