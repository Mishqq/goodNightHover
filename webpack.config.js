const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');


const cssConfig = {
	dev : ['style-loader', 'css-loader', 'sass-loader'],

	prod: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: [{loader: 'css-loader', options: {minimize: true}}, {loader: 'sass-loader'}]
	})
};


module.exports = (env, options) => {
	const isProd = options.mode === 'production';

	return {
		entry: {
			app: './src/index.js'
		},
		output: {
			path: path.resolve(__dirname, './dist'),
			filename: '[name].bundle.js',
			publicPath: ''
		},

		devServer: {
			overlay: true,
			compress: true,
			port: 9000,
			hot: true,
			stats: 'errors-only'
		},

		devtool: isProd ? false : 'eval-sourcemap',

		module: {
			rules: [
				{test: /\.js$/, loader: 'babel-loader', exclude: '/node_modules/'},

				{test: /\.sass$/, use: isProd ? cssConfig.prod : cssConfig.dev},

				{test: /\.pug$/, use: ['html-loader', 'pug-html-loader']},

				{
					test: /\.(png|svg|jpe?g|gif)$/,
					use: [
						'file-loader?name=images/[name].[ext]&outputPath=images/&publicPath=images/',
						// 'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/',
						'image-webpack-loader'
					]
				}
			]
		},

		plugins: [
			new ExtractTextPlugin({
				filename: 'app.bundle.css',
				disable: !isProd,
				allChunks: true
			}),

			new HtmlWebpackPlugin({
				title: 'Template',
				filename: 'index.html',
				inject: true,
				hash: true,
				minify: {
					collapseWhitespace: true
				},
				template: './src/index.pug'
			}),

			// new SpritesmithPlugin({
			// 	src: {
			// 		cwd: path.resolve(__dirname, 'src/images/icons'),
			// 		glob: '*.png'
			// 	},
			// 	target: {
			// 		image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
			// 		css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.sass')
			// 	},
			// 	apiOptions: {
			// 		cssImageRef: "~sprite.png"
			// 	}
			// }),

			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	};
};
