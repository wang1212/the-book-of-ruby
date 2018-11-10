/* App entry file */

import './app.scss';

import controller from 'utils/controller.js';

import { generate_category, auto_active_nav, add_header, add_footer } from 'components/category.js';
import { insert_line_num } from 'components/line-numbers.js';
import { generate_navigation } from 'components/navigation.js';


generate_category();

controller([
	() => (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0),
	auto_active_nav,
	add_header,
	add_footer,
	insert_line_num,
	generate_navigation
]);