/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fgPrimary: 'rgba(var(--fg-primary))',
        fgSecondary: 'rgba(var(--fg-secondary))',
        fgSubHeader: 'rgba(var(--fg-sub-header))',
        borderPrimary: 'rgba(var(--border-primary))',
        hoverPrimary: 'rgba(var(--hover-primary))',
        hoverSecondary: 'rgba(var(--hover-secondary))',
        bgButton: 'rgba(var(--bg-button))',
        bgPrimary: 'rgba(var(--bg-primary))',
        itemBg: 'rgba(var(--item-bg))',
        bgSecondary: 'rgba(var(--bg-secondary))',
      },
    },
  },
  plugins: [],
};
