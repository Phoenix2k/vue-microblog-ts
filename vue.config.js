module.exports = {
	devServer: {
		overlay: {
			errors: true,
			warnings: true
		},
		proxy: {
			"^/api": {
				target: "http://localhost:5000",
				secure: false
			}
		}
	},
	lintOnSave: "production" !== process.env.NODE_ENV,
	publicPath: process.env.BASE_URL,
	outputDir: "./dist/public",
	pages: {
		index: {
			entry: "./src/client/main.ts",
			filename: "index.html",
			template: "./public/index.html"
		}
	}
};
