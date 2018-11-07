const PATH = require('path');

const path_config = require('./path.config.js');

const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin       = require('html-webpack-plugin'),
	UglifyJsPlugin          = require('uglifyjs-webpack-plugin'),
	MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
	OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	ImageminPlugin          = require('imagemin-webpack-plugin').default,
	ImageminJpeg            = require('imagemin-jpeg-recompress');


module.exports = {
	mode        : path_config.dev ? 'development'                 : 'production',
	target      : 'web',
	devtool     : path_config.map ? 'cheap-module-eval-source-map': 'none',
	watch       : true,
	watchOptions: {
		ignored: /node_modules/
	},
	context: PATH.resolve(__dirname, '../'),
	entry  : {
		app: './src/app.js'
	},
	output: {
		path         : path_config.dist,
		filename     : path_config.dev ? '[name].js': '[name].[chunkhash].js',
		chunkFilename: path_config.dev ? '[name].js': '[name].[chunkhash].js'
	},
	module: {
		rules: [
			{
				test   : /\.(js|jsx)$/,
				exclude: /node_modules/,
				use    : [
					{
						loader : 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								require('@babel/plugin-syntax-dynamic-import'),
								require('@babel/plugin-proposal-class-properties'),
								require('@babel/plugin-proposal-object-rest-spread')
							],
							sourceMaps: true
						}
					}
				]
			},
			{
				test   : /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use    : [
					path_config.dev ? 'style-loader': MiniCssExtractPlugin.loader,
					{
						loader : 'css-loader',
						options: {
							minimize    : true,
							sourceMap   : true,
							importLoader: 2
						}
					},
					{
						loader : 'postcss-loader',
						options: {
							sourceMap: true,
							ident    : 'postcss',
							plugins  : () => [
								require('autoprefixer')({ browsers: ['last 2 versions'] })
							]
						}
					},
					{
						loader : 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use : [
					{
						loader : 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context : '.',
			manifest: PATH.join(path_config.dist, './vendor-manifest.json')
		}),
		new CopyWebpackPlugin([{
			from : './src/vendors',
			to   : './vendors',
			cache: true
		}]),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: './src/app.html',
			chunks  : ['app', 'commons']
		}),
		new MiniCssExtractPlugin({
			filename     : path_config.dev ? '[name].css': '[name].[hash].css',
			chunkFilename: path_config.dev ? '[id].css'  : '[id].[hash].css',
		}),
		new ImageminPlugin({
			disable: path_config.dev,
			optipng: {
				optimizationLevel: 7
			},
			gifsicle: {
				optimizationLevel: 3,
				interlaced       : true
			},
			jpegtran: null,
			svgo    : {
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			},
			pngquant: {},
			plugins : [
				ImageminJpeg()
			]
		})
	],
	resolve: {
		alias: {
			components: PATH.resolve('./src/components/'),
			utils     : PATH.resolve('./src/utils/'),
			vendors   : PATH.resolve('./src/vendors/'),
			html      : PATH.resolve('./html/')
		}
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache    : true,
				parallel : true,
				sourceMap: true
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks            : 'initial',
					minChunks         : 2,
					maxInitialRequests: 5,
					minSize           : 30000,
					reuseExistingChunk: true,
				},
				/* 	vendor: {
					test    : /node_modules/,
					chunks  : 'initial',
					name    : 'vendor',
					priority: 10,
					enforce : true
				} */
			}
		},
		//runtimeChunk: true
	},
	performance: {
		hints      : 'warning',
		assetFilter: assetFilename => {
			return path_config.dev ? false: !(/vendor/.test(assetFilename));
		}
	}
};