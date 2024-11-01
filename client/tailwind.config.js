/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add this to scan your JSX/TSX files
    './public/index.html',         // Add your public directory if needed
  ],
  theme: {
    extend: {
      colors: {
        'teal-500': '#38b2ac',
        'teal-700': '#2c7a7b',
        'purple-400': '#9f7aea',
        'indigo-500': '#667eea',
      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Example font stack
      },
    },
  },
  plugins: [],
};
