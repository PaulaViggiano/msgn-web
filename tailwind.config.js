/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#0D1117',
        bg2:     '#161B27',
        bg3:     '#1C2333',
        cream:   '#EDE8DF',
        cream2:  '#C8C0B0',
        gold:    '#C9993A',
        gold2:   '#E8B84B',
        teal:    '#4A9B8E',
        'brand-slate': '#6B7A99',
        'off-white':   '#F5F2EC',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        sans:     ['"DM Sans"', 'sans-serif'],
        mono:     ['"DM Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp:   { '0%': { opacity: '0', transform: 'translateY(22px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        pulseDot: { '0%,100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(201,153,58,0.4)' }, '50%': { opacity: '0.7', boxShadow: '0 0 0 6px rgba(201,153,58,0)' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        bounceH:  { '0%,100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(6px)' } },
      },
      animation: {
        fadeUp:   'fadeUp 0.8s ease forwards',
        fadeIn:   'fadeIn 0.8s ease forwards',
        pulseDot: 'pulseDot 2s infinite',
        marquee:  'marquee 30s linear infinite',
        bounceH:  'bounceH 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}