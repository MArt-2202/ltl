export default function modal() {
	const images = [];
	let itemIndex = 0;

	if (document.querySelector('#lightbox-list .list-img')) {
		document.querySelectorAll('#lightbox-list .list-img').forEach((el) => {
			const temImgWebp = el.dataset.imgWebp,
				itemImg = el.dataset.img;

			images.push({
				webp: temImgWebp,
				img: itemImg,
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
			list = document.querySelector('#lightbox-list');

		prevBtn.addEventListener('click', () => {
			if (itemIndex > 0) {
				--itemIndex;
			} else {
				itemIndex = list?.children.length - 1;
			}
			targetModal
				.querySelector('picture source')
				.setAttribute('srcset', images.at(itemIndex)?.webp);
			targetModal.querySelector('picture img').setAttribute('src', images.at(itemIndex)?.img);
		});

		nextBtn.addEventListener('click', () => {
			if (itemIndex < list?.children.length - 1) {
				++itemIndex;
			} else {
				itemIndex = 0;
			}
			targetModal
				.querySelector('picture source')
				.setAttribute('srcset', images.at(itemIndex)?.webp);
			targetModal.querySelector('picture img').setAttribute('src', images.at(itemIndex)?.img);
		});
	}

	if (document.querySelector('.modal-btn')) {
		document.querySelectorAll('.modal-btn').forEach((el, index) => {
			el.addEventListener('click', function (e) {
				e.preventDefault();
				if (el.dataset.modalBtn !== '') {
					const targetModal = document.querySelector(`[data-modal="${el.dataset.modalBtn}"]`);

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
						targetModal.querySelector('picture')
					) {
						const itemImgWebp = el.dataset.imgWebp,
							itemImg = el.dataset.img,
							img = targetModal.querySelector('picture');

						itemIndex = index;

						if (img.querySelector('source')) {
							img.querySelector('source').setAttribute('srcset', itemImgWebp);
						}

						if (img.querySelector('img')) {
							img.querySelector('img').setAttribute('src', itemImg);
						}
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
