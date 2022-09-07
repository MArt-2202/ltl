'use strict';

import debounce from './modules/debounce';
import sliders from './modules/sliders';
import accordion from './modules/accordion.js';
import backToTop from './modules/backToTop.js';
import blocksStyles from './modules/blocksStyles';
import blockPosition from './modules/blockPosition';
import modal from './modules/modal';
import tableWrapper from './modules/tableWrapper';
import toggleContent from './modules/toggleContent';

if ('ontouchstart' in document.documentElement) {
	document.body.classList.add('touchdevice');
}

function isMobile(agent) {
	if (agent === void 0) agent = navigator.userAgent;

	return /Android|iPhone|iPad|iPod/i.test(agent);
}

if (isMobile()) {
	document.body.classList.add('mobile-user-agent');
}

document.addEventListener('DOMContentLoaded', () => {
	sliders();
	accordion();
	backToTop();
	modal();
	tableWrapper();
	toggleContent();
}); // END READY

window.addEventListener('resize', () => {
	debounce(function () {
		blockPosition();
	}, 200);
});

window.addEventListener('load', () => {
	debounce(function () {
		blocksStyles();
		blockPosition();
	}, 200);
});
