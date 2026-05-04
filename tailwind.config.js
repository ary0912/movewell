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
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      transitionDuration: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
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

        // MoveWell Color System (Based on EightShapes)
        emerald: {
          '05': '#f0fdf4',
          '10': '#dcfce7',
          '20': '#bbf7d0',
          '30': '#86efac',
          '40': '#4ade80',
          '50': '#22c55e', // Primary brand
          '60': '#16a34a',
          '70': '#15803d', // Dark brand
          '80': '#166534',
          '90': '#064e3b',
          '95': '#022c1d',
        },

        blue: {
          '05': '#f0f9ff',
          '10': '#e0f2fe',
          '20': '#bae6fd',
          '30': '#7dd3fc',
          '40': '#38bdf8',
          '50': '#0ea5e9', // Interactive primary
          '60': '#0284c7', // Interactive hover
          '70': '#0369a1', // Interactive active
          '80': '#075985',
          '90': '#0c3d66',
          '95': '#051e2d',
        },

        gray: {
          '02': '#fafafa',
          '05': '#f5f5f5',
          '10': '#ebebeb',
          '20': '#d4d4d4',
          '30': '#bdbdbd',
          '70': '#4a4a4a',
          '80': '#323232',
          '90': '#1a1a1a',
          '95': '#0d0d0d',
        },

        // Feedback Colors
        success: {
          '05': '#f0fdf4',
          '20': '#bbf7d0',
          '50': '#22c55e',
          '80': '#166534',
        },

        warning: {
          '05': '#fffbeb',
          '20': '#fde68a',
          '50': '#fbbf24',
          '80': '#92400e',
        },

        error: {
          '05': '#fef2f2',
          '20': '#fecaca',
          '50': '#ef4444',
          '80': '#7f1d1d',
        },

        info: {
          '05': '#f0f9ff',
          '20': '#bae6fd',
          '50': '#0ea5e9',
          '80': '#075985',
        },
      },
    },
  },
  plugins: [tailwindAnimate],
}