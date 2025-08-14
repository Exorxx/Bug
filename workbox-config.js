module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{svg,js,png,jpg,html,json,md,css}'
	],
	swDest: 'service-worker.js',
	cleanupOutdatedCaches: true,
	navigateFallback: '/index.html',
	ignoreURLParametersMatching: [
		/^utm_/, /^home$/
	]
};