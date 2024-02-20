/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
        'lavender': '#e8bfda',
        'dark-lavender': '#d2a8c7',
        'muted-red': '#fcc0c0',
        'muted-red2': '#faa6a6',
        'neutral1': '#F2F2F2',
        'neutral2': '#333333',
        'neutral3': '#666666',
        'neutral4': '#d2d2d2',
      },
    },
  },
  plugins: [],
}