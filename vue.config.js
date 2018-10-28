module.exports = {
	baseUrl: process.env.BASE_URL,
	devServer: {
		overlay: {
			errors: true,
			warnings: true
		},
		proxy: {
			'/api': {
				secure: false,
				target: 'http://localhost:5000'
			}
		}
	},
	lintOnSave: 'production' !== process.env.NODE_ENV,
	outputDir: './dist/public',
	pages: {
		index: {
			entry: './src/client/main.ts',
			filename: 'index.html',
			template: './public/index.html'
		}
	}
};
