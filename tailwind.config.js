/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#0a0a0f',
          secondary: '#111118',
          card: '#16161f',
          'card-hover': '#1c1c28',
        },
        accent: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          pink: '#ec4899',
          cyan: '#06b6d4',
          emerald: '#10b981',
        },
      },
      animation: {
        'gradient-shift': 'gradientShift 4s ease infinite',
        'fade-in-up': 'fadeInUp 0.4s ease both',
        'spin-slow': 'spin 1s linear',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139,92,246,0.7)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translate(-50%,10px)' },
          to: { opacity: '1', transform: 'translate(-50%,0)' },
        },
      },
      backgroundSize: {
        '200': '200% 200%',
      },
      backdropBlur: {
        xs: '4px',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139,92,246,0.2)',
        'glow-lg': '0 8px 40px rgba(139,92,246,0.5)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'elevated': '0 8px 48px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
