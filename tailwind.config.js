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
        input: 'rgba(var(--input))',
        fgSecondary: 'rgba(var(--fg-secondary))',
        fgSubHeader: 'rgba(var(--fg-sub-header))',
        borderPrimary: 'rgba(var(--border-primary))',
        hoverPrimary: 'rgba(var(--hover-primary))',
        hoverSecondary: 'rgba(var(--hover-secondary))',
        mobileNavFrom: 'rgba(var(--mobile-nav-from))',
        mobileNavTo: 'rgba(var(--mobile-nav-to))',
        bgButton: 'rgba(var(--bg-button))',
        bgSuccess: 'rgba(var(--bg-success))',
        buttonHover: 'rgba(var(--hover-button))',
        bgPrimary: 'rgba(var(--bg-primary))',
        itemBg: 'rgba(var(--item-bg))',
        bgSecondary: 'rgba(var(--bg-secondary))',
        buttonCta: 'rgba(var(--button-cta))',
      },
    },
  },
  plugins: [],
};
