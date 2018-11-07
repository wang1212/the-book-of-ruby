/*! External dependencies packaged individually */

const PATH = require('path');

const path_config = require('./path.config.js');

const webpack = require('webpack');


module.exports = {
	mode   : path_config.dev ? 'development': 'production',
	context: PATH.resolve(__dirname, '../'),
	entry  : {
		vendor: Object.keys(require('../package.json').dependencies) || ''
	},
	output: {
		path    : path_config.dist,
		filename: '[name].js',
		library : '[name]_lib_[hash]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]_lib_[hash]',
			path: PATH.join(path_config.dist, '[name]-manifest.json')
		})
	],
	performance: {
		hints      : 'warning',
		assetFilter: assetFilename => {
			return !(/vendor/.test(assetFilename));
		}
	}
};