/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#2d2a26',
        'sidebar-hover': '#3d3a36',
        'sidebar-active': '#4a6b5a',
        cream: '#faf8f5',
        'cream-dark': '#f0ece6',
        teal: {
          chart: '#5cc9c4',
          light: '#a8e6e2',
          pale: '#d4f4f2',
        },
        coral: '#e07a5f',
        'coral-light': '#f0a890',
        olive: '#8a7d5a',
        mauve: '#c9a0b0',
        'badge-green': '#22c55e',
        'badge-red': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
