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
          text: "#ede8e4",
          "text-light": "#a69e98",
          "text-faint": "#6e6660",
          accent: "#cc8c70",
          "accent-hover": "#daa088",
          teal: "#6b9e9a",
          "teal-hover": "#88b5b2",
          cream: "#0d0d0d",
          surface: "#3a2010",
          border: "#2a2420",
          "border-light": "#1a1614",
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
