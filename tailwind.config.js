/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'fredoka': ['Fredoka', 'sans-serif']
      },
      colors: {
        background: {
          primary: '#3A2834',
          secondary: '#f0f2f5',
          tertiary: '#944A50',
        },
        pie: {
          red: '#f44336', // Rojo
          pink: '#e91e63', // Rosa fuerte
          purple: '#9c27b0', // Púrpura
          deepPurple: '#673ab7', // Azul violeta
          indigo: '#3f51b5', // Azul índigo
          blue: '#2196f3', // Azul
          lightBlue: '#03a9f4', // Azul cielo
          cyan: '#00bcd4', // Cian
          teal: '#009688', // Verde esmeralda
          green: '#4caf50' // Verde
        },
        button: {
          green:'#40d64c', //focus and hover
          red:'#f85f5f', //focus and hover
        }
      },
    },
  },
  plugins: [],
}

