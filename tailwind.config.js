/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			fgPrimary: 'rgba(var(--fg-primary))',
  			input: 'hsl(var(--input))',
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
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
