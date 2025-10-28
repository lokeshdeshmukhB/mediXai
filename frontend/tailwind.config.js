/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6BBF59',
          50: '#f0fdf0',
          100: '#dcfcd6',
          200: '#bbf7b2',
          300: '#8eef81',
          400: '#6BBF59',
          500: '#4caf50',
          600: '#2E7D32',
          700: '#1b5e20',
          800: '#194d1a',
          900: '#163f17',
        },
        secondary: {
          DEFAULT: '#2E7D32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        text: {
          primary: '#4A4A4A',
          secondary: '#B0B0B0',
        },
      },
    },
  },
  plugins: [],
}
