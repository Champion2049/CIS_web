/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563eb', // Blue-600
          dark: '#60a5fa',  // Changed to lighter blue for dark mode
        },
        background: {
          light: '#ffffff',
          dark: '#000000',  // Changed to pure black
        },
        surface: {
          light: '#f1f5f9',  // Slate-100
          dark: '#111111',   // Changed to very dark gray
        },
        text: {
          light: '#1e293b',  // Slate-800
          dark: '#bfdbfe',   // Changed to light blue
        }
      }
    },
  },
  plugins: [],
};