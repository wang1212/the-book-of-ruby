/* App entry file */

import './app.scss';

import category from '../html/category.json';

let str = '';

category.forEach(file => {
	str += '<a href="#/' + file.path + '">' + file.title + '</a>';
});

document.getElementById('nav').innerHTML = str;

// router
window.onhashchange = () => {

	let file_path = location.hash.slice(2);

	// get html
	fetch('../html/' + file_path).then(response => {

		if (response.status == 200) {
			response.text().then(html => document.getElementById('content').innerHTML = html);
		} else {
			location.hash = '/' + category[0].path;
		}

	});

};

window.onhashchange();