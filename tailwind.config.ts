import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        // Standard min-width breakpoints
        xs: "340px",
        "sm-xs": "400px",
        "md-xs": "460px",

        // Max-width breakpoints qo'shish (odatda teskari tartibda yoziladi)
        // Masalan: (min-width: 640px) uchun 'sm' bo'lsa,
        // (max-width: 639px) uchun 'max-sm' bo'ladi.
        // Tailwind standart breakpointlariga asoslanamiz:
        "max-sm": { max: "639px" }, // sm (640px) dan oldingi o'lchamlar uchun
        "max-md": { max: "767px" }, // md (768px) dan oldingi o'lchamlar uchun
        "max-lg": { max: "1023px" }, // lg (1024px) dan oldingi o'lchamlar uchun
        "max-xl": { max: "1279px" }, // xl (1280px) dan oldingi o'lchamlar uchun
        "max-2xl": { max: "1535px" }, // 2xl (1536px) dan oldingi o'lchamlar uchun

        // Agar sizning custom breakpointlaringiz uchun max-width kerak bo'lsa:
        "max-md-xs": { max: "459px" }, // md-xs (460px) dan oldingi o'lchamlar uchun
        "max-sm-xs": { max: "399px" }, // sm-xs (400px) dan oldingi o'lchamlar uchun
        "max-xs": { max: "339px" },   // xs (340px) dan oldingi o'lchamlar uchun
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;