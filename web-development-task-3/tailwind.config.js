/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          bg: '#1b1f24',
          panel: '#20252b',
          border: '#2d333b',
          text: '#d8dee4',
          dim: '#7d8590',
        },
        paper: {
          bg: '#fbf9f5',
          panel: '#ffffff',
          border: '#e5e0d5',
          text: '#2a2620',
          dim: '#8a8375',
        },
        amber: {
          DEFAULT: '#e8a33d',
          dim: '#c98a2c',
        },
        teal: {
          DEFAULT: '#2f6f6b',
          light: '#3d8d88',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
