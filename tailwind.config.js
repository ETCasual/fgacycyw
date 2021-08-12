module.exports = {
	important: true,
	mode: 'jit',
	purge: ['./src/**/*.tsx'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				century: ["'Century Gothic'", 'sans-serif']
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('@tailwindcss/aspect-ratio')
	]
}
