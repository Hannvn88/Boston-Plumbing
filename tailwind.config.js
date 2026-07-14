// Tailwind configuration — font pairing plus the aurora background animation.
// Palette uses built-ins per spec: white background, gray-800 #1F2937 text,
// slate-600 muted text, green-700 #15803D as the single sparing accent.
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Deep forest green accent, flat solid tones only
      colors: {
        forest: {
          DEFAULT: '#14432A',
          deep: '#0F3D2E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // body
        display: ['"General Sans"', 'Inter', 'system-ui', 'sans-serif'], // headlines
        script: ['Caveat', 'cursive'], // handwritten accents (AI indicator)
      },
      // Continuous horizontal drift used by the Aurora background layers.
      // 10s cycle so the flowing motion is clearly visible within a few seconds.
      animation: {
        aurora: 'aurora 10s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
    },
  },
  plugins: [],
};
