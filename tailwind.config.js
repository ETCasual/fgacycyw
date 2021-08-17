module.exports = {
	important: true,
	mode: 'jit',
	purge: ['./src/**/*.tsx'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				chiTitle: ["'REEJI-HonghuangLiGB'", 'sans-serif'],
				chiText: ["'Kaiti'", 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				bebas: ["'Bebas Neue'", 'sans-serif'],
				century: ["'Century Gothic'", 'sans-serif'],
				gloss: ["'Gloss And Bloom'", 'sans-serif']
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
		require('tailwindcss-elevation')(['responsive'])
	]
}
