/* code line-numbers */

function insert_line_num() {

	document.querySelectorAll('.file-content pre > code').forEach(ele => {
		const style_obj = getComputedStyle(ele),
			_height = +style_obj.height.match(/[\d.]+/),
			_lh     = +style_obj.lineHeight.match(/[\d.]+/);

		let _num = Math.ceil(_height / _lh),
			line_number = [];

		while (_num--) {
			line_number.push(_num + 1 + '\n');
		}

		ele.setAttribute('line-number', line_number.reverse().join(' '));
	});

}

export {
	insert_line_num
};

export default insert_line_num;