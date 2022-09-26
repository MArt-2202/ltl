export default function modal(node, lightbox) {
	if (
		document.querySelector(node) &&
		document.querySelector(lightbox) &&
		document.querySelector('.modal__content')
	) {
		const modal = document.querySelector(node),
			modalContent = modal.querySelector('.modal__content'),
			list = document.querySelector(lightbox),
			listSrc = [],
			listFormat = [],
			listSrcSet = [],
			listSizes = [],
			listDescription = [],
			listSeparator = list.dataset.separator,
			listViewport = list.dataset.viewport.split(','),
			listMedia = [],
			regExp = /^[A-za-z/_\-]+\d+/gi,
			regExpFormat = /\.[a-z]+/gi;

		let itemIndex = 0;

		modalContent.insertAdjacentHTML('afterbegin', `<picture></picture>`);

		if (list.querySelector('source')) {
			list.querySelectorAll('source').forEach((item) => {
				listSrcSet.push(...item.getAttribute('srcset').match(regExp));
			});
		}

		if (list.querySelector('img')) {
			list.querySelectorAll('img').forEach((item) => {
				const width = item.closest('.modal-btn').dataset.sizes.split(',').at(0),
					height = item.closest('.modal-btn').dataset.sizes.split(',').at(1);

				listSrc.push(...item.getAttribute('src').match(regExp));
				listSizes.push({
					width,
					height,
				});
				listFormat.push();
			});
		}

		if (document.querySelector(`${lightbox} .modal-btn + strong`)) {
			document
				.querySelectorAll(`${lightbox} .modal-btn + strong`)
				.forEach((title) => listDescription.push(title.textContent));
		}

		document
			.querySelector(lightbox)
			.querySelectorAll('.modal-btn')
			.forEach((item) => {
				const sourceFormat = item
						.querySelector('source')
						.getAttribute('srcset')
						.match(regExpFormat)
						.join(),
					imgFormat = item.querySelector('img').getAttribute('src').match(regExpFormat).join();

				listFormat.push({
					sourceFormat,
					imgFormat,
				});
			});

		if (listViewport) {
			listViewport.forEach((viewport, index) => {
				const src = `${listSrc.at(0)}${listSeparator}${viewport}`,
					srcSet = `${listSrcSet.at(0)}${listSeparator}${viewport}`;

				if (index === 0) {
					listMedia.push({
						[viewport]: `<source srcset="${srcSet}${
							listFormat.at(0).sourceFormat
						}" media="(max-width: ${viewport}px)" type="image/webp">`,
					});
				}
				if (index > 0 && index < listViewport.length - 1) {
					listMedia.push({
						[viewport]: `<source srcset="${srcSet}${
							listFormat.at(0).sourceFormat
						}" media="(min-width: ${
							+listViewport.at(index - 1) + 1
						}px) and (max-width: ${viewport}px)" type="image/webp">`,
					});
				}
				if (index === listViewport.length - 1) {
					listMedia.push({
						[viewport]: `<source srcset="${srcSet}${
							listFormat.at(0).sourceFormat
						}" type="image/webp">`,
					});
				}
				if (index === listViewport.length - 1) {
					listMedia.push({
						img: `<img src="${src}${listFormat.at(0).imgFormat}" alt="" width="${
							listSizes.at(0).width
						}" height="${listSizes.at(0).height}" loading="lazy">`,
					});
				}
				modalContent
					.querySelector('picture')
					.insertAdjacentHTML('beforeend', `${listMedia?.at(index)[viewport]}`);
			});
		}

		modalContent.querySelector('picture').innerHTML += `${listMedia?.at(-1)?.img}`;

		if (document.querySelector(`${node} .modal__title`)) {
			document.querySelector(`${node} .modal__title`).textContent = `${listDescription.at(0)}`;
		}

		if (
			modal.querySelector('.lightbox-btn--prev') &&
			modal.querySelector('.lightbox-btn--next') &&
			modal.querySelector('.modal__close')
		) {
			const prevBtn = modal.querySelector('.lightbox-btn--prev'),
				nextBtn = modal.querySelector('.lightbox-btn--next'),
				closeBtn = modal.querySelector('.modal__close');

			if (document.querySelector(`${lightbox} .modal-btn`)) {
				document.querySelectorAll(`${lightbox} .modal-btn`).forEach((el, index) => {
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

							itemIndex = index;
							setPictureHtml();

							nextBtn.style.marginRight = document.body.style.paddingRight;
							closeBtn.style.marginRight = document.body.style.paddingRight;
						}
					});
				});
			}

			prevBtn.addEventListener('click', () => {
				if (itemIndex > 0) {
					--itemIndex;
				} else {
					itemIndex = list?.children.length - 1;
				}
				setPictureHtml();
			});

			nextBtn.addEventListener('click', () => {
				if (itemIndex < list?.children.length - 1) {
					++itemIndex;
				} else {
					itemIndex = 0;
				}
				setPictureHtml();
			});

			modal.addEventListener('click', function (e) {
				const target = e.target;

				e.stopPropagation();

				if (target.closest('.modal__close')) {
					modal.classList.remove('show');
					nextBtn.style.marginRight = '';
					closeBtn.style.marginRight = '';

					setTimeout(() => {
						modal.classList.add('dn');
					}, 200);

					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';
				}
			});
		}

		function setPictureHtml() {
			if (modalContent.querySelector('picture source')) {
				modalContent.querySelectorAll('picture source').forEach((source, index) => {
					source.setAttribute(
						'srcset',
						`${listSrcSet.at(itemIndex)}${listSeparator}${listViewport.at(index)}${
							listFormat.at(itemIndex).sourceFormat
						}`
					);
				});
			}
			if (modalContent.querySelector('picture img')) {
				modalContent
					.querySelector('picture img')
					.setAttribute(
						'src',
						`${listSrc.at(itemIndex)}${listFormat.at(itemIndex).imgFormat}`
					);
				modalContent
					.querySelector('picture img')
					.setAttribute('width', `${listSizes.at(itemIndex).width}`);
				modalContent
					.querySelector('picture img')
					.setAttribute('height', `${listSizes.at(itemIndex).height}`);
			}
			if (document.querySelector(`${node} .modal__title`)) {
				document.querySelector(`${node} .modal__title`).textContent = `${listDescription.at(
					itemIndex
				)}`;
			}
		}
	}
}
