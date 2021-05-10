const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    colors: {
      gray: colors.trueGray,
      teal: colors.teal,
      red: colors.red,
      green: colors.green,
    },
  },
  variants: {},
  plugins: [],
};
