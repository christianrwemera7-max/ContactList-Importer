import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(217 91% 60%)', // Bleu Électrique
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: 'hsl(45 93% 55%)', // Jaune Or
          foreground: 'hsl(222 47% 12%)',
        },
        muted: {
          DEFAULT: 'hsl(217 20% 90%)',
          foreground: 'hsl(217 20% 40%)',
        },
        'muted-2': 'hsl(217 20% 40%)',
        border: 'hsl(217 20% 90%)',
        input: 'hsl(217 20% 90%)',
        ring: 'hsl(217 91% 60%)',
        gold: 'hsl(45 93% 55%)',
        blue: 'hsl(217 91% 60%)',
        cyan: 'hsl(188 100% 47%)',
        teal: 'hsl(162 59% 48%)',
        orange: 'hsl(25 100% 50%)',
        ink: '#FFFFFF',
        surface: '#F8FAFC',
        'surface-2': '#F1F5F9',
        'surface-3': '#E2E8F0',
        line: '#E2E8F0',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: '16px',
        sm: '12px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
