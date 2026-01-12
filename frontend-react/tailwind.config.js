/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50:  '#0b1221', // Deep space black
          100: '#151e32',
          200: '#232d45',
          300: '#34405a',
          400: '#586785',
          500: '#7b8ba6',
          600: '#a3b1cc',
          700: '#cdd6e8',
          800: '#eef2f6', // Teks utama putih/silver
          900: '#ffffff',
        },
        indigo: {
          50:  '#e0fbff',
          100: '#b3f5ff',
          400: '#26e2ff',
          500: '#00d9f7', // Electric Cyan (Primary)
          600: '#00adc4',
          700: '#008293',
        },
        red: {
          500: '#ff0055', // Magenta/Neon Pink (Accent)
          600: '#cc0044',
        },
        'neon-purple': '#bc13fe', // Custom color
      },
      fontFamily: {
        sans: ['Inter', 'Orbitron', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
          '50%': { boxShadow: '0 0 20px #bc13fe, 0 0 40px #bc13fe' },
        }
      }
    },
  },
  plugins: [],
}