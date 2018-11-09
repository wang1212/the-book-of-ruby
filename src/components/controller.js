/* controller router */

import category from 'html/category.json';


// controller
function controller(middlewares = []) {

	// register
	window.onhashchange = () => {

		let file_path = location.hash.slice(2);

		// get html
		fetch('./html/' + file_path).then(response => {

			if (response.status == 200) {

				response.text().then(html => document.getElementById('content').innerHTML = html).then(() => {
					// Middleware
					middlewares.forEach(callback => callback(file_path));
				});

			} else {
				location.hash = '/' + category[0].path;
			}

		});

	};

	// auto
	window.onhashchange();

}

export default controller;