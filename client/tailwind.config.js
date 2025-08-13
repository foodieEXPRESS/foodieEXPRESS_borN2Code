// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4318D1",
          alt: "#10B981",
        },
        secondary: {
          dark: "#1A1A1A",
          gray: "#666666",
          light: "#E5E5E5",
          lighter: "#FAFAFA",
        },
        foodie: {
          primary: "#4318D1",
          bg: "#FAFAFA",
          text: "#1A1A1A",
          gray: "#666666",
          placeholder: "#999999",
          border: "#E5E5E5",
          filter: "#D9D9D9",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        brand: ['Italiana', 'serif'],
      },
      fontSize: {
        'heading-1': ['42px', { lineHeight: '63px', fontWeight: '700' }],
        'heading-2': ['24px', { lineHeight: '36px', fontWeight: '700' }],
      },
      boxShadow: {
        success: '0 4px 15px 0 rgba(16, 185, 129, 0.30)',
      },
      borderRadius: {
        md: '8px',
      },
      spacing: {
        'btn-sm': '0.5rem 1rem',
        'btn-md': '0.75rem 1.5rem',
        'btn-lg': '1rem 2rem',
        'btn-xl': '1.25rem 2.5rem',
      },
    },
  },
  plugins: [],
}