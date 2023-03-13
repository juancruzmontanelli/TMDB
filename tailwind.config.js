/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
    colors: {
      'blue': '#2CA5DD',
      'yellow': '#E0AA02',
      'custom-black': '#2A2929',
      'gray' : '#C2C2C2',
      'red' : '#DD0000',
      'green' : '#46B600',
     },
     spacing: {
      '128': '32rem',
    },
    boxShadow: {
      'around': '0 1px 10px 1px rgba(0, 0, 0, 0.3)',
      'big-around': '0 10px 60px 1px rgba(0, 0, 0, 0.3)',
    }
    }
  },
  plugins: [],
}
