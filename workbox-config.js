module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{svg,js,png,jpg,html,json,md,css}'
	],
	swDest: 'service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};