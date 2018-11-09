/*! generate category */

import category from 'html/category.json';


function generate_category() {
	let str = '';

	category.forEach(file => {
		str += '<a class="chapter d-block mb-2" href="#/' + file.path + '">' + file.title + '</a>';
	});

	document.getElementById('nav').innerHTML = str;
}

function auto_active_nav(file_path) {
	for (let ele of [].slice.apply(document.getElementById('nav').children)) {
		if (ele.getAttribute('href').slice(2) === file_path) {
			ele.classList.add('active');
		} else {
			ele.classList.remove('active');
		}
	}
}

function add_header(file_path) {
	const file = category.find(file => file.path === file_path),
		content_ele = document.getElementById('content');

	let header = document.createElement('header');

	header.classList.value = 'mb-5 pb-2 file-header';
	header.innerHTML       = '<span class="badge badge-light mr-3 d-none d-md-inline-block">' + file.ctime + ' 添加</span>' +
		'<span class="badge badge-light mr-3">' + file.mtime + ' 更新</span>' +
		'<a class="mr-3 d-none d-sm-inline-block" href="https://github.com/wang1212/the-book-of-ruby" target="_blank">on GitHub</a>' +
		'<a class="float-right" href="https://github.com/wang1212/the-book-of-ruby/blob/master/book_of_ruby.pdf" target="_blank">PDF of book</a>';

	content_ele.insertBefore(header, content_ele.firstChild);
}


export {
	generate_category,
	auto_active_nav,
	add_header
};

export default generate_category;