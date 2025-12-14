/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: '#FFFFFF',
          surface: '#F5F5F5',
          text: '#1F2937',
          textSecondary: '#6B7280',
          primary: '#FF6B35',
          primaryDark: '#E55A2B',
          border: '#E5E7EB',
        },
        // Dark mode colors
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          text: '#F1F5F9',
          textSecondary: '#94A3B8',
          primary: '#FF6B35',
          primaryDark: '#E55A2B',
          border: '#334155',
        },
      },
    },
  },
  plugins: [],
}

