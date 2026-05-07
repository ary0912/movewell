import tailwindAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'xxs': '4px',
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
        'section': '96px',
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'pill': '9999px',
        'full': '9999px',
      },
      transitionDuration: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 4px 12px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'md': '0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)',
        'lg': '0 12px 32px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.03)',
        'xl': '0 20px 48px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.04)',
        '2xl': '0 32px 64px rgba(0, 0, 0, 0.12), 0 16px 24px rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-lg': ['56px', { lineHeight: '1.05', letterSpacing: '-0.035em', fontWeight: '500' }],
        'display-md': ['40px', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display-sm': ['32px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '500' }],
        'title-lg': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-md': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'title-sm': ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '1.55', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.55', fontWeight: '400' }],
        'caption': ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'button': ['14px', { lineHeight: '1', fontWeight: '600' }],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Clay Design System Colors
        clay: {
          primary: "#0a0a0a",
          ink: "#0a0a0a",
          body: "#3a3a3a",
          canvas: "#fffaf0",
          "surface-soft": "#faf5e8",
          "surface-card": "#f5f0e0",
          "surface-strong": "#ebe6d6",
          "brand-pink": "#ff4d8b",
          "brand-teal": "#1a3a3a",
          "brand-lavender": "#b8a4ed",
          "brand-peach": "#ffb084",
          "brand-ochre": "#e8b94a",
          "brand-mint": "#a4d4c5",
          "brand-coral": "#ff6b5a",
        },

        success: {
          DEFAULT: '#22c55e',
          '05': '#f0fdf4',
        },
        warning: {
          DEFAULT: '#f59e0b',
          '05': '#fffbeb',
        },
        error: {
          DEFAULT: '#ef4444',
          '05': '#fef2f2',
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
}