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
import masketInput from './modules/masketInput';
import scrollToAnchor from './modules/scrollToAnchor';
import tabs from './modules/tabs';
import mapIntersectionObserver from './modules/mapIntersectionObserver';

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

function teachersListStyles() {
	if (document.querySelector('.school__teachers-list .list-img')) {
		document
			.querySelectorAll('.school__teachers-list .list-img')
			.forEach((el) => (el.style.paddingTop = `${el.offsetWidth}px`));
	}
}

document.addEventListener('DOMContentLoaded', () => {
	sliders();
	accordion();
	backToTop();
	modal('[data-modal="modal-1"]', '#lightbox-list-1');
	modal('[data-modal="school-gallery"]', '#school-gallery');
	modal('[data-modal="oak-se"]', '#oak-se');
	modal('[data-modal="beech-se"]', '#beech-se');
	modal('[data-modal="ash-vr"]', '#ash-vr');
	modal('[data-modal="oak-vr"]', '#oak-vr');
	modal('[data-modal="alder-vr"]', '#alder-vr');
	tableWrapper();
	toggleContent();
	masketInput();
	scrollToAnchor();
	tabs({});
	mapIntersectionObserver('#map-with-pins');
}); // END READY

window.addEventListener('resize', () => {
	debounce(function () {
		blockPosition();
		teachersListStyles();
		scrollToAnchor();
	}, 200);
});

window.addEventListener('load', () => {
	if (document.querySelector('header')) {
		document.querySelector('header').classList.add('header--ready');
	}
	debounce(function () {
		blocksStyles();
		blockPosition();
		teachersListStyles();
		scrollToAnchor();
	}, 200);
});
