var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // плагин для загрузки кода Vue
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin') // Vuetify загрузчик
 
module.exports = {
	entry: './assets/js/main.js',
 
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
 
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}, 
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
			  test: /\.(js|jsx)$/,
			  exclude: /node_modules/,
			  use: {
				loader: "babel-loader"
			  }
			},
			{
				test: /\.styl$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "stylus-loader" // compiles Stylus to CSS
					}
					]
			}		
		]
	},
 
	plugins: [
		new VueLoaderPlugin(),
		new VuetifyLoaderPlugin()
	],
	
	// https://webpack.js.org/configuration/devtool/
	devtool: "source-map"
}