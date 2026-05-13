import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif'],
        'dm-mono': ['var(--font-dm-mono)', 'monospace'],
        'yatra-one': ['var(--font-yatra-one)', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        highlight: {
          "0%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "var(--highlight)" },
        },
        flash: {
          "0%": { backgroundColor: "hsl(var(--card, 0 0% 100%))" },
          "50%": { backgroundColor: "var(--highlight)" },
          "100%": { backgroundColor: "hsl(var(--card, 0 0% 100%))" },
        },
      },
      animation: {
        highlight: "highlight 0.6s ease forwards",
        flash: "flash 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
