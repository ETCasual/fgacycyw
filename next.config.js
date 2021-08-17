const withPWA = require('next-pwa')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		// swSrc: './service-worker.js',
		register: true,
		dynamicStartUrl: true,
		dynamicStartUrlRedirect: '/login'
	},
	webpack5: true
})
