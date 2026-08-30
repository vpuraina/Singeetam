import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a16",
        panel: "#12121e",
        panel2: "#171726",
        panel3: "#212133",
        brand: {
          DEFAULT: "#38bdf8",
          dark: "#2192cf",
        },
        gold: "#f5c44b",
        line: "rgba(255,255,255,0.1)",
        muted: "#b6b7c8",
      },
      fontFamily: {
        display: ["'Baloo 2'", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #38bdf8, #f5c44b)",
        "brand-text-gradient": "linear-gradient(90deg, #9fe0ff 0%, #6fc9ff 45%, #f5c44b 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
