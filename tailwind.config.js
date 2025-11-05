 /** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily: {
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
      colors: {
        brand: 'var(--color-brand)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        foreground: 'var(--color-foreground)',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    styled: true,
    themes: false,
    rtl: false,
  },
}