/* starter */

// tools
const del = require('del'),
	webpack      = require('webpack'),
	browser_sync = require('browser-sync').create();

// path config
const Path = require('./config/path.config.js');


// server
browser_sync.init({
	open  : false,
	server: {
		baseDir: './docs/'
	}
});

del([Path.dist + '/**/*', '!' + Path.dist + '/html/**', '!' + Path.dist + '/images/**']).then(() => {

	console.log('--------- clean dir is completed ! -----------');

	// webpack
	return new Promise((resolve, reject) => {

		/* 1. External dependence */
		webpack(require('./config/webpack.dll.config'), (err, stats) => {
			err && reject(err);

			console.log(stats.toString({
				colors      : true,
				modules     : false,
				children    : false,
				chunks      : false,
				chunkModules: false
			}));

			resolve(200);
		});

	});

})
	.then(data => {
		if (data === 200) {

			/* 2. Business code */
			webpack(require('./config/webpack.config'), (err, stats) => {
				if (err) {
					return err;
				}

				console.log(stats.toString({
					colors      : true,
					modules     : false,
					children    : false,
					chunks      : false,
					chunkModules: false
				}));

				browser_sync.reload();
			});

		}
	})
	.catch(err => {
		console.log(err.message);
	});