const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		// swSrc: './service-worker.js',
		register: true,
		dynamicStartUrl: true
		//   dynamicStartUrlRedirect: '/login',
		//   disable: process.env.NODE_ENV === 'development'
	},

	webpack5: true
})
