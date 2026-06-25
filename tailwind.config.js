/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          red: '#7f1d1d',       // Deep Crimson for headings/banners
          redLight: '#991b1b',  // Medium Crimson for buttons/accent hover
          redDark: '#450a0a',   // Darkest Crimson for deep borders/shadows
          gold: '#b45309',      // Dark gold/amber for timelines/accents
          goldLight: '#d97706', // Light gold for hover states
          cream: '#fdfbf7',     // Main background color (warm off-white)
          creamDark: '#f5f2eb', // Slightly darker cream for card backgrounds
          charcoal: '#1f2937',  // Primary text color (high contrast)
          grayLight: '#9ca3af'  // Secondary text color/borders
        }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'museum': '0 4px 20px -2px rgba(127, 29, 29, 0.08), 0 2px 8px -1px rgba(180, 83, 9, 0.04)',
        'museum-hover': '0 10px 25px -3px rgba(127, 29, 29, 0.12), 0 4px 12px -2px rgba(180, 83, 9, 0.08)',
      }
    },
  },
  plugins: [],
}
