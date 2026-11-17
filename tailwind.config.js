/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fbf6ee',
        sand: '#f0e6d6',
        ink: '#2b2622',
        muted: '#6f655b',
        pine: { DEFAULT: '#2f5d50', dark: '#244a40', soft: '#e3eee9' },
        clay: { DEFAULT: '#c4663a', soft: '#fbe8dc' },
        star: '#e8a317',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
