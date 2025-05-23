import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Set Lato as the default sans-serif
        handwriting: ['Pacifico', 'cursive'], // Add Pacifico
      },
      colors: {
        festive: {
          red: '#D9534F',
          green: '#5CB85C',
          gold: '#F0AD4E',
          lightBg: '#FAF7F0', // A soft, creamy off-white
          darkText: '#333333',
        },
        // Example of keeping existing indigo for buttons or specific elements if needed
        // For now, let's assume we might still use some existing colors for flexibility.
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
