module.exports = {
	important: true,
	mode: 'jit',
	purge: ['./src/**/*.tsx'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				chi: ["'Noto Sans SC'", 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				bebas: ["'Bebas Neue'", 'sans-serif'],
				century: ["'Century Gothic'", 'sans-serif'],
				gloss: ["'Gloss And Bloom'", 'sans-serif']
			},
			colors: {
				PRIMARY: '#3F2771',
				SECONDARY: '#EE96B9',
				smoothPink: '#f7e3ec',
				pink2: '#ffb59b',
				yellowmain: '#FFBA00'
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
