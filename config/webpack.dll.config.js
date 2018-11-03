/*! External dependencies packaged individually */

const PATH = require('path');

const gulp_config = require('./gulpfile.config');

const webpack = require('webpack');


module.exports = {
	mode   : gulp_config.dev ? 'development': 'production',
	context: PATH.resolve(__dirname, '../'),
	entry  : {
		vendor: Object.keys(require('../package.json').dependencies) || ''
	},
	output: {
		path    : gulp_config.dist,
		filename: '[name].js',
		library : '[name]_lib_[hash]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]_lib_[hash]',
			path: PATH.join(gulp_config.dist, '[name]-manifest.json')
		})
	],
	performance: {
		hints      : 'warning',
		assetFilter: assetFilename => {
			return !(/vendor/.test(assetFilename));
		}
	}
};