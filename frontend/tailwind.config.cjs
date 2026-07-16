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
        paper: '#FFEEDD',
        paperDark: '#241019',
        grid: '#FFD9B8',
        gridDark: '#472138',
        ink: '#2B1220',
        inkDark: '#FFE9D6',
        blueprint: '#FF6B35',
        blueprintDark: '#E85A2A',
        blueprintSoft: '#FFA36B',
        pencil: '#FF3D77',
        pencilSoft: '#FF7FA6',
        graphite: '#8A6656',
        graphiteDark: '#C9A28F',
        card: '#FFFBF5',
        cardDark: '#33192A',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'sans-serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
