/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        'custom': '.5px', // Replace '20px' with your desired padding value
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {  
        customBlue: '#0C1326',
        customFontColorBlack:'#2A3B4F'
      } 
    },
  },
});