/*! Path config */

const NODE_ENV = process.env.NODE_ENV || 'production';

const SRC_DIR = './src/',
	DIST_DIR = require('path').resolve(__dirname, '../dist/');

module.exports = {
	dev: !(NODE_ENV === 'production'),
	map: !(NODE_ENV === 'production'),

	src : SRC_DIR,
	dist: DIST_DIR
};