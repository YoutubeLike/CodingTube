module.exports = {
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/deprecation-warnings'),
    require('autoprefixer'),
  ],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  // plugins: {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
}
