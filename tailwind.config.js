/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Fraunces', 'sans-serif'],
        secondary: ['Poppins', 'sans-serif']
      },
      colors: {
        teal: {
          dark: '#2F4144',
          light: '#00C2B2',
        },
        background: '#f5f7f7',
        customGray: {
          100: '#C6D0D0',
          200: '#6B7280',
          300: '#2F4144',
        },
      },
    },
  },
  plugins: []
};