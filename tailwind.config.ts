import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          offWhite: "#F7F7F2",
          charcoal: "#111111",
          softGray: "#E5E5E5",
          muted: "#737373",
          green: "#174C3C",
          greenDark: "#0E382C"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 17, 17, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
