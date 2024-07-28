/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom1: '0 12px 40px 2px rgba(0, 0, 0, 0.5)',
        custom2: '2px 4px 24px 0px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'shift-away': {
          '0%': {
            opacity: '0',
            transform: 'translateY(5%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0%)',
          },
        },
        'show-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0%)',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 150ms ease-in-out',
      },
    },
    fontFamily: {
      body: [
        'Inter',
        'system-ui',
        'Avenir',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
    },
  },
  plugins: [],
};
