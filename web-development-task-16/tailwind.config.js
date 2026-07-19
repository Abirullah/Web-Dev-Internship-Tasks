/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // App background — soft, airy light blue
        haze: {
          50: '#F4FAFF',
          100: '#EAF4FC',
          200: '#D9ECFA',
          300: '#C3E1F6',
        },
        // Dark bluish surfaces for components (nav, cards, modal)
        navy: {
          950: '#071B33',
          900: '#0B2545',
          800: '#123A63',
          700: '#1B4A79',
          600: '#28618F',
        },
        // Single accent used sparingly — signal teal
        signal: {
          400: '#5EEAD4',
          500: '#2DD4BF',
          600: '#14B8A6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,37,69,0.06), 0 8px 24px -8px rgba(11,37,69,0.18)',
        cardHover: '0 4px 10px rgba(11,37,69,0.10), 0 20px 40px -12px rgba(11,37,69,0.30)',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        pulseBar: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        sweep: 'sweep 1.6s ease-in-out infinite',
        pulseBar: 'pulseBar 1s ease-in-out infinite',
        rise: 'rise 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
