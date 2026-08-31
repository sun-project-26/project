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
        background: '#090d16',
        surface: {
          50: '#1e293b',
          100: '#172033',
          200: '#111827',
          300: '#0d1322',
          400: '#090d16',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Electric Indigo
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        bmw: {
          yellow: '#eab308',
          yellowLight: '#fef08a',
          yellowGlow: 'rgba(234, 179, 8, 0.25)',
          red: '#ef4444',
          redLight: '#fca5a5',
          redGlow: 'rgba(239, 68, 68, 0.25)',
          white: '#f8fafc',
          whiteLight: '#ffffff',
          whiteGlow: 'rgba(248, 250, 252, 0.25)',
          blue: '#3b82f6',
          blueLight: '#93c5fd',
          blueGlow: 'rgba(59, 130, 246, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.45)',
        'glow-yellow': '0 0 25px -5px rgba(234, 179, 8, 0.45)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.45)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.45)',
        'glow-white': '0 0 25px -5px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '90%' },
          '100%': { top: '0%' },
        }
      }
    },
  },
  plugins: [],
}
