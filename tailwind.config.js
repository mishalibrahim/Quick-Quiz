
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Nunito:['Nunito','sans-serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:'#FF3B3F',
        secondary:'#AF9CF3',
      },
      backgroundImage: {
        "home-gradient": "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
      },
      dropShadow:{
       'home-circle':'0px 8px 8px 0px #0000001A',
      }
    },
  },
  plugins: [],
};
