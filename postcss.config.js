// PostCSS pipeline — runs Tailwind, then vendor-prefixes the output
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
