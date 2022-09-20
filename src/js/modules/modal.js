export default function modal() {
	const images = [];
	let itemIndex = 0;

	if (document.querySelector('#lightbox-list .list-img')) {
		document.querySelectorAll('#lightbox-list .list-img').forEach((el) => {
			const webp = el.dataset.imgWebp.split(','),
				img = el.dataset.img,
				imgW = el.dataset.sizes.split(',')?.at(0),
				imgH = el.dataset.sizes.split(',')?.at(1);

			images.push({
				webp576: webp?.at(0),
				webp768: webp?.at(1),
				webp1200: webp?.at(2),
				webp1600: webp?.at(3),
				webp: webp?.at(4),
				img,
				imgW,
				imgH,
			});
		});
	}

	if (
		document.querySelector('#lightbox-btn--prev') &&
		document.querySelector('#lightbox-btn--next') &&
		document.querySelector('[data-modal="modal-1"]') &&
		document.querySelector('#lightbox-list')
	) {
		const prevBtn = document.querySelector('#lightbox-btn--prev'),
			nextBtn = document.querySelector('#lightbox-btn--next'),
			targetModal = document.querySelector('[data-modal="modal-1"]'),
			picture = targetModal.querySelector('picture'),
			img = targetModal.querySelector('picture img'),
			list = document.querySelector('#lightbox-list');

		function setPictureAttributes() {
			if (picture.querySelector('source')) {
				picture.querySelectorAll('source').forEach((el, index) => {
					switch (index) {
						case 0:
							el.setAttribute('srcset', images?.at(itemIndex)?.webp576);
							break;
						case 1:
							el.setAttribute('srcset', images?.at(itemIndex)?.webp768);
							break;
						case 2:
							el.setAttribute('srcset', images?.at(itemIndex)?.webp1200);
							break;
						case 3:
							el.setAttribute('srcset', images?.at(itemIndex)?.webp1600);
							break;
						case 4:
							el.setAttribute('srcset', images?.at(itemIndex)?.webp);
							break;
						default:
							el.setAttribute('srcset', images?.at(itemIndex)?.img);
					}

					if (img) {
						img.setAttribute('src', images?.at(itemIndex)?.img);
						img.setAttribute('width', images?.at(itemIndex)?.imgW);
						img.setAttribute('height', images?.at(itemIndex)?.imgH);
					}
				});
			}
		}

		prevBtn.addEventListener('click', () => {
			if (itemIndex > 0) {
				--itemIndex;
			} else {
				itemIndex = list?.children.length - 1;
			}
			setPictureAttributes();
		});

		nextBtn.addEventListener('click', () => {
			if (itemIndex < list?.children.length - 1) {
				++itemIndex;
			} else {
				itemIndex = 0;
			}
			setPictureAttributes();
		});

		if (document.querySelector('.modal-btn')) {
			document.querySelectorAll('.modal-btn').forEach((el, index) => {
				el.addEventListener('click', function (e) {
					e.preventDefault();

					if (el.dataset.modalBtn !== '') {
						const targetModal = document.querySelector(
							`[data-modal="${el.dataset.modalBtn}"]`
						);

						targetModal.classList.remove('dn');
						setTimeout(() => {
							targetModal.classList.add('show');
						}, 50);

						document.body.style.paddingRight =
							window.innerWidth - document.documentElement.clientWidth + 'px';
						document.body.style.overflowY = 'hidden';

						if (
							el.dataset.modalBtn === 'modal-1' &&
							el.dataset.imgWebp !== '' &&
							el.dataset.img !== '' &&
							el.dataset.sizes !== '' &&
							targetModal.querySelector('picture')
						) {
							itemIndex = index;
							setPictureAttributes();
						}

						if (document.querySelector('#lightbox-btn--next')) {
							document.querySelector('#lightbox-btn--next').style.marginRight =
								document.body.style.paddingRight;
						}

						if (document.querySelector('#modal__close')) {
							document.querySelector('#modal__close').style.marginRight =
								document.body.style.paddingRight;
						}
					}
				});
			});
		}

		if (document.querySelector('.modal-overlay')) {
			document.querySelectorAll('.modal-overlay').forEach((el) => {
				el.addEventListener('click', function (e) {
					const target = e.target;

					e.stopPropagation();

					if (target.closest('.modal__close')) {
						el.classList.remove('show');
						setTimeout(() => {
							el.classList.add('dn');
						}, 200);

						document.body.style.overflowY = '';
						document.body.style.paddingRight = '';
					}
				});
			});
		}
	}
}
