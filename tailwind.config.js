module.exports = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#000000', // Black
          secondary: '#1a1a1a', // Slightly lighter black
          tertiary: '#333333', // Lighter black
          text: '#666666', // Dark gray
          heading: '#ffffff', // White
          accent: '#d9d9d9', // Light gray
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode for background colors
      textColor: ['dark'], // Enable dark mode for text colors
    },
  },
  plugins: [
    // Add any additional plugins here
  ],
};
