/* App entry file */

import './app.scss';

import { generate_category, auto_active_nav, add_header } from 'components/category.js';
import controller from 'components/controller.js';


generate_category();

controller([
	() => document.body.scrollTop = 0,
	auto_active_nav,
	add_header
]);