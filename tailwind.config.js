/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        museum: {
          bg: '#0c0f12',
          surface: '#13181d',
          card: '#181f26',
          border: '#26313c',
          text: '#f1f5f9',
          muted: '#8e9cae',
          accent: '#e2b36f', // warm architectural brass/amber
          concrete: '#222b35',
          blueprint: '#2a6f97',
          blueprintLight: '#64dfdf',
          wood: '#9a7b56',
          paper: '#f8f6f0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        display: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        'blueprint-grid': "linear-gradient(to right, rgba(100, 223, 223, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 223, 223, 0.07) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      }
    },
  },
  plugins: [],
}
