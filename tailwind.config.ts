import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          900: "#1a1a1a",
          800: "#222222",
          700: "#2a2a2a",
          600: "#333333",
        },
        brand: {
          text: "#303838",
          "text-light": "#5c6767",
          "text-faint": "#8a9494",
          accent: "#cc8c70",
          "accent-hover": "#b87a5e",
          teal: "#456b68",
          "teal-hover": "#345452",
          cream: "#faf6f2",
          surface: "#f5f1ed",
          border: "#e8e2dc",
          "border-light": "#f0ebe6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
