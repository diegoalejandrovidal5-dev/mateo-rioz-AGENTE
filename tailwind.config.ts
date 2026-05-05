import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand palette ───────────────────────────────────────────
           #101b37  navy dark (primary background / dark sections)
           #01c9f0  cyan electric (accent / CTAs)
           #ffffff  white (foreground text)
        ─────────────────────────────────────────────────────────── */
        emerald: {
          50:  "#e0fbff",
          100: "#b8f5fe",
          200: "#7aedfb",
          300: "#3de3f8",
          400: "#01c9f0",
          500: "#01c9f0",
          600: "#00a8cc",
          700: "#0089a8",
          800: "#006b85",
          900: "#004d61",
          950: "#002f3c",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        /* body & h1/h3+ — Heebo */
        sans:    ["var(--font-heebo)", "Heebo", "sans-serif"],
        body:    ["var(--font-heebo)", "Heebo", "sans-serif"],
        heading: ["var(--font-heebo)", "Heebo", "sans-serif"],
        /* h2 subtitles — Manrope */
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
        sub:     ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
