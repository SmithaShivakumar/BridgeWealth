/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0B3A6E',
        'success-green': '#00C389',
        'accent-purple': '#6B4EFF',
        'bg-light': '#F7F8FA',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}