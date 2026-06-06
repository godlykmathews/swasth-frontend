import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#35281f",
        umber: "#5e4634",
        vellum: "#f7ecd6",
        parchment: "#efe0c0",
        gilt: "#b88936",
        rosewood: "#774139",
        skywash: "#b7dceb",
        cypress: "#516a52"
      },
      boxShadow: {
        folio: "0 18px 44px rgba(75, 53, 31, 0.17)",
        etching: "inset 0 0 0 1px rgba(184, 137, 54, 0.32), inset 0 0 0 8px rgba(255, 248, 229, 0.48)"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        script: ["Palatino", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
