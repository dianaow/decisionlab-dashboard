/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['LyonDisplay', 'sans-serif'],
        secondary: ['Sailec', 'sans-serif']
      },
      colors: {
        primary: {
          darkgreen: '#334445',
          green: '#319187',
          teal: '#23CEBC',
        },
        background: {
          light: '#F4F7F7',
          dark: '#EBF0F0'
        },
        grey: {
          linegreen: '#C6D0D0',
          darkgreen: '#334445',
          light: '#849AA8',
          dark: '#718593'
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')]
};