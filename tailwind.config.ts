
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
        ink: '#0D1210',
        surface: '#141B18',
        'surface-2': '#1C2620',
        line: '#263229',
        gold: '#E8A83C',
        teal: '#35C29B',
        'teal-dim': 'rgba(53,194,155,0.1)',
        'gold-dim': 'rgba(232,168,60,0.1)',
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: '16px',
        sm: '12px',
      },
      backgroundImage: {
        'k-gradient': 'radial-gradient(circle at 15% 8%, rgba(53,194,155,0.06), transparent 40%), radial-gradient(circle at 85% 92%, rgba(232,168,60,0.05), transparent 40%)',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
