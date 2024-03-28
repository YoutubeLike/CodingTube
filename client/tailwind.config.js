/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar":{
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],

    screens: {
      sm: '512px',
      md: '768px',
      lg: '1024',
      xl: '1280px',
    },
    
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      roboto: ['Roboto', 'sans-serif'],
    },

    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

      fontSize: {
        'xl':'1.5rem',
        '2xl': '1.75rem', 
        '3xl': '2rem', 
      },

      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
