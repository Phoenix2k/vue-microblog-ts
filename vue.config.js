module.exports = {
	baseUrl: '/',
	chainWebpack: config => {
		// Only available if `public` folder exists
		config.plugin( 'copy' ).tap( ( [ options ] ) => {
			options[0].from = 'src/client/public';
		} );
	},
	lintOnSave: 'production' !== process.env.NODE_ENV,
	outputDir: './public',
	pages: {
		index: {
			entry: './src/client/main.ts',
			filename: 'index.html',
			template: './src/client/public/index.html'
		}
	}
};
