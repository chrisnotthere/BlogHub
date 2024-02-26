/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'light-turquoise': '#f4fffd',
        'turquoise': '#d0e9e5',
        'dark-turquoise': '#98c6bc',
        'teal1': '#00AA99',
        'teal2': '#9CD2CA',
        'teal3': '#ECFDFA',
        'dark-teal': '#00665c',
        'light-rose': '#fff9fd',
        'rose': '#FADBEF',
        'dark-rose': '#F9A7D1',
        'lavender': '#f7d2eb',
        'dark-lavender': '#d2a8c7',
        'muted-red': '#fcc0c0',
        'muted-red2': '#faa6a6',
        'neutral1': '#F2F2F2',
        'neutral2': '#333333',
        'neutral3': '#666666',
        'neutral4': '#d2d2d2',
        // new colors
        'deep-sea': '#22577A',
        'bright-teal': '#38A3A5',
        'mint-green': '#57CC99',
        'spring-green': '#80ED99',
        'soft-mint': '#C7F9CC',
      },
    },
  },
  plugins: [],
}
