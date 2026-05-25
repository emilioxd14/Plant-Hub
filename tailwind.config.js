/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#09110e',
        'plant-card': 'rgba(20, 38, 30, 0.6)',
        'emerald': '#10b981',
        'cyber-mint': '#2dd4bf',
        'soft-gold': '#fbbf24',
        'coral-red': '#ef4444',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        space: ['Space Grotesk', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scan-line': 'scanLine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        }
      }
    },
  },
  plugins: [],
}
