/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024',
      xl: '1280px',
    },

    colors: {
      'gray-dark': '#404040',
      'gray': '#a1a1a1',
      'gray-light': '#e3e4e6',
    },
    
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
