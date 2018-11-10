/*! content navigation */

// Generate navigation
function generate_navigation(file_path) {

	// none
	if (+file_path.split('')[0] < 2) {
		return;
	}

	let h_datas = [],
		nav_ele = document.createElement('div'),
		html    = '';

	['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(h => {
		document.querySelectorAll(h).forEach(ele => {
			h_datas.push({
				type: h,
				top : ele.getBoundingClientRect().top,
				text: ele.textContent
			});
		});
	});

	nav_ele.classList.value = 'navigation d-none d-gl-block';

	h_datas.sort((a, b) => a.top - b.top).forEach(h => {
		html += '<div class="d-block ' + h.type + '" s_top="' + h.top + '">' + h.text + '</div>';
	});

	nav_ele.innerHTML = html;

	document.querySelector('.file-content').appendChild(nav_ele);

	// scroll
	window.onscroll = function() {
		nav_ele.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + 'px';
	};

	// click
	setTimeout(() => {

		Array.from(nav_ele.children).forEach(ele => {
			ele.onclick = () => {
				document.body.scrollTop            = +ele.getAttribute('s_top');
				document.documentElement.scrollTop = +ele.getAttribute('s_top');
			};
		});

	}, 100);
}


export {
	generate_navigation
};

export default generate_navigation;