/*! convert markdown to html file */

const marked = require('marked');

const fs = require('fs'),
	path = require('path');

const SRC = 'markdown/',
	DEST = 'docs/html/';

let category = [];


/**
 * -- Config tools
 */
marked.setOptions({
	renderer : new marked.Renderer(),
	highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	},
	pedantic   : false,
	gfm        : true,
	tables     : true,
	breaks     : false,
	sanitize   : false,
	smartLists : true,
	smartypants: false,
	xhtml      : false
});


/**
 * Clear directory
 *
 * @param {any} dir_path
 */
function dir_clear(dir_path) {
	fs.readdirSync(dir_path).forEach(fileName => {
		const _file_path = path.join(dir_path, fileName);
		/* Type of judgment */
		const _stats = fs.statSync(_file_path);
		if (_stats.isFile()) {
			fs.unlinkSync(_file_path);
		} else if (_stats.isDirectory()) {
			/* Recursive */
			return dir_clear(_file_path) || fs.rmdirSync(_file_path);
		}
	});
}


/**
 * Convert markdown to html
 *
 * @param {any} dir_path
 */
function convert_md_2_html(dir_path) {

	fs.readdirSync(dir_path).forEach(fileName => {

		const file_path = path.join(dir_path, fileName),
			target_path = path.join(DEST, path.relative(SRC, file_path));

		const stats = fs.statSync(file_path);

		// markdown file
		if (stats.isFile() && path.extname(fileName) === '.md') {

			let content = fs.readFileSync(file_path, 'utf-8'),
				info          = {},
				new_file_path = path.join(path.dirname(target_path), path.basename(target_path, '.md') + '.html');

			// get file info
			try {
				info = content.match(/---[\s\S]*?(\{[\s\S]*?\})[\s\S]*?---/);
				info && (content = content.replace(/---[\s\S]*?---/, '')) && (info = JSON.parse(info[1])) || (info = {});
			} catch (err) {
				console.log(err.message);
				console.log(file_path + ': no document info !');
				info = {};
			}

			// convert markdown 2 html
			fs.writeFile(
				new_file_path,
				marked(content),
				err => err && console.log(err.message)
			);

			// add info
			category.push({
				'order': +path.basename(new_file_path).slice(0, 1),
				'path' : path.relative(DEST, new_file_path),
				'title': info.title || '无标题文档',
				'ctime': info.ctime || stats.ctime.toLocaleString(),
				'mtime': info.mtime || stats.mtime.toLocaleString()
			});

		}

	});

}


dir_clear(DEST);
console.log('- Clear directory complete!');

convert_md_2_html(SRC);
console.log('- Convert markdown to html complete!');

/* Create category json file */
fs.writeFile(
	path.join(DEST, 'category.json'),
	JSON.stringify(category.sort((a, b) => a.order - b.order)), err => !err && console.log('- The category json file has been generated!')
);