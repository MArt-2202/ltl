export default function sliders() {
	if (document.querySelector('.reviews__slider')) {
		new Swiper('.reviews__slider', {
			on: {
				init() {
					if (document.querySelector('.reviews__slider-wrapper')) {
						document.querySelector('.reviews__slider-wrapper').classList.remove('style-3');
					}
				},
			},
			loop: true,
			forceToAxis: true,
			autoHeight: true,
			navigation: {
				nextEl: '.reviews__slider-wrapper .slider-btn--next',
				prevEl: '.reviews__slider-wrapper .slider-btn--prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		});
	}
}
