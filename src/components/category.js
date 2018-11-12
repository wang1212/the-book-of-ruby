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
		content_ele = document.getElementById('content'),
		header_ele  = document.createElement('header');

	header_ele.classList.value = 'mb-5 pb-2 file-header';
	header_ele.innerHTML       = '<span class="badge badge-light mr-3 d-none d-md-inline-block">' + file.ctime + ' 添加</span>' +
		'<span class="badge badge-light mr-3">' + file.mtime + ' 更新</span>' +
		'<a class="mr-3 d-none d-sm-inline-block" href="https://github.com/wang1212/the-book-of-ruby" target="_blank">on GitHub</a>' +
		'<a class="float-right" href="./book_of_ruby.pdf" target="_blank">PDF of book</a>';

	content_ele.insertBefore(header_ele, content_ele.firstChild);
}

function add_footer(file_path) {
	const file = category.find(file => file.path === file_path),
		index      = category.indexOf(file),
		footer_ele = document.createElement('footer');

	let last = category[index - 1],
		next = category[index + 1];

	footer_ele.innerHTML = '' +
		(last && ('<a class="float-left" href="#/' + last.path + '">&lt;&lt; ' + last.title + '</a>') || '') +
		(next && ('<a class="float-right" href="#/' + next.path + '">' + next.title + ' &gt;&gt;</a>') || '');

	footer_ele.classList.value = 'file-footer clearfix mt-5 pt-2';

	document.getElementById('content').appendChild(footer_ele);
}


export {
	generate_category,
	auto_active_nav,
	add_header,
	add_footer
};

export default generate_category;