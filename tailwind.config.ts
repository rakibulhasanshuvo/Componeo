import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0e0e0e",
        surface: "#0e0e0e",
        "surface-bright": "#2c2c2c",
        "surface-variant": "#262626",
        "surface-dim": "#0e0e0e",
        "surface-container-lowest": "#000000",
        "surface-container-low": "#131313",
        "surface-container": "#1a1919",
        "surface-container-high": "#201f1f",
        "surface-container-highest": "#262626",
        
        primary: "#00d2fd",
        "primary-container": "#00d2fd",
        "primary-fixed": "#00d2fd",
        "primary-fixed-dim": "#00c3eb",
        "primary-dim": "#00c3eb",
        "on-primary": "#002c37",
        "on-primary-fixed": "#002c37",
        
        secondary: "#e2e2e5",
        "secondary-container": "#454749",
        "secondary-fixed": "#e2e2e5",
        "secondary-fixed-dim": "#d4d4d7",
        "on-secondary": "#505254",
        
        tertiary: "#daf9ff",
        "tertiary-container": "#b2f0fa",
        "tertiary-fixed": "#b2f0fa",
        "tertiary-fixed-dim": "#a4e1ec",
        "on-tertiary": "#23646d",
        
        error: "#ff716c",
        "error-container": "#9f0519",
        "on-error": "#490006",
        
        "on-surface": "#ffffff",
        "on-surface-variant": "#adaaaa",
        "on-background": "#ffffff",
        outline: "#777575",
        "outline-variant": "#494847",
        "inverse-surface": "#fcf8f8",
        "inverse-on-surface": "#565554",
        "inverse-primary": "#00687e",
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        label: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};

export default config;
