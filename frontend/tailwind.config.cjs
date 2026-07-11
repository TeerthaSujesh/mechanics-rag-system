/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EEF3F3',
        paperDark: '#101A20',
        grid: '#CBDBDD',
        gridDark: '#22343B',
        ink: '#152A3A',
        inkDark: '#E7EEF0',
        blueprint: '#2B6E7E',
        blueprintDark: '#1F5361',
        blueprintSoft: '#5FBBCB',
        pencil: '#B33F32',
        pencilSoft: '#E2695A',
        graphite: '#5C6D72',
        graphiteDark: '#93A6AC',
        card: '#FBFDFC',
        cardDark: '#16232A',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
