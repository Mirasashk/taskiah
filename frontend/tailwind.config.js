/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'selector',
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-family)', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'text-xs': 'var(--font-size-xs)',
				'text-sm': 'var(--font-size-sm)',
				'text-base': 'var(--font-size-base)',
				'text-lg': 'var(--font-size-lg)',
				'text-xl': 'var(--font-size-xl)',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
