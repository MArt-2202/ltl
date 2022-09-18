export default function blockStyles() {
	if (document.querySelector('h2')) {
		document.querySelectorAll('h2').forEach((el) => {
			if (el.nextElementSibling?.tagName === 'P') {
				el.classList.add('title-1');
			}
		});
	}

	if (
		document.querySelector('#search-form') &&
		document.querySelector('#search-form__input') &&
		document.querySelector('#search-form__list') &&
		document.querySelector('#search-form__close')
	) {
		const input = document.querySelector('#search-form__input'),
			list = document.querySelector('#search-form__list'),
			closeBtn = document.querySelector('#search-form__close');

		input.addEventListener('input', function (e) {
			if (e.target.value.length) {
				closeBtn.classList.remove('dn');
			} else {
				closeBtn.classList.add('dn');
			}

			if (e.target.value.length > 2) {
				list.classList.add('show');
			} else {
				list.classList.remove('show');
			}
		});

		closeBtn.addEventListener('click', function () {
			input.value = '';
			list.classList.remove('show');

			this.classList.add('dn');
		});

		document.addEventListener('click', function (e) {
			if (!e.target.closest('#search-form')) {
				list.classList.remove('show');
				input.value = '';
				closeBtn.classList.add('dn');
			}
		});
	}

	if (document.querySelector('.lazyload-map')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.src) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
									<iframe src="${entry.target.dataset.src}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
								`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll('.lazyload-map').forEach((item) => observer.observe(item));
	}

	if (document.querySelector('#video-list .video-wrapper')) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.dataset.video) {
						entry.target.insertAdjacentHTML(
							'beforeend',
							`
							<iframe src="${entry.target.dataset.video}" title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen></iframe>
								`
						);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document
			.querySelectorAll('#video-list .video-wrapper')
			.forEach((item) => observer.observe(item));
	}
}
