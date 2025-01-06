/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'selector',
	theme: {
		extend: {},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
