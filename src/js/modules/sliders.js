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

	if (document.querySelector('.confidence__slider')) {
		new Swiper('.confidence__slider', {
			on: {
				init() {
					if (document.querySelector('.confidence__slider-wrapper')) {
						document.querySelector('.confidence__slider-wrapper').classList.remove('style-3');
					}
				},
			},
			loop: true,
			slidesPerView: 6,
			spaceBetween: 40,
			forceToAxis: true,
			navigation: {
				nextEl: '.confidence__slider-wrapper .slider-btn--next',
				prevEl: '.confidence__slider-wrapper .slider-btn--prev',
			},
			breakpoints: {
				1230: { slidesPerView: 6, spaceBetween: 40 },
				1024: { slidesPerView: 4, spaceBetween: 40 },
				768: { slidesPerView: 3, spaceBetween: 30 },
				576: { slidesPerView: 2, spaceBetween: 20 },
				300: { slidesPerView: 1, spaceBetween: 15 },
			},
		});
	}
}
