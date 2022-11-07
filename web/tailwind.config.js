/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        landing: "url('/appBG.png')",
      },
      colors: {
        green: {
          500: '#129e57',
        },
        gray: {
          100: '#e1e1e6',
          300: '#8d8d99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },
        yellow: {
          500: '#F7DD43',
          700: '#e5cd3d',
        },
      },
    },
  },
  plugins: [],
};
