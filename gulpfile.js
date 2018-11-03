/* Base */
const gulp = require('gulp'),
	gulp_clean   = require('gulp-clean'),
	webpack      = require('webpack'),
	browser_sync = require('browser-sync').create();

/* path config */
const CONFIG = require('./config/gulpfile.config');


browser_sync.init({
	open  : false,
	server: {
		baseDir: './'
	}
});


/**
 *  Task
 */
gulp.task('default', ['clean', 'webpack']);

// Clean
gulp.task('clean', function () {
	return gulp.src(CONFIG.dist, { read: false })
		.pipe(gulp_clean({ force: true }));
});

// Webpack
gulp.task('webpack', ['clean'], function () {

	new Promise((resolve, reject) => {
		/* External dependence */
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
	})
		.then(data => {
			if (data === 200) {
				/* Business code */
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

});