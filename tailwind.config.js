/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#EEFDF2',
          100: '#DCFBE6',
          200: '#BBF7CE',
          300: '#86ECA7',
          400: '#4ADB7B',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803C',
          800: '#166532',
          900: '#14532B',
        },
        earth: {
          50: '#FDF4EE',
          100: '#FBE9DD',
          200: '#F7D3BB',
          300: '#F3B898',
          400: '#EF9C75',
          500: '#EA8052',
          600: '#E56A3F',
          700: '#D4502C',
          800: '#B03D1F',
          900: '#8D2F18',
        },
        crimson: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      transitionDuration: {
        '300': '300ms',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.05)',
        'elevated': '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}