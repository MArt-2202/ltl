export default function scrollToAnchor() {
	if (document.querySelector('.scroll-to-anchor')) {
		document.addEventListener('click', function (e) {
			let link = e.target;

			if (link.closest('.scroll-to-anchor')) {
				e.preventDefault();
				scrollToTarget(link.hash);
			}
		});

		if (location.hash !== '') {
			scrollToTarget(location.hash);
		}

		function scrollToTarget(id) {
			let target = document.querySelector(id);

			if (target !== null) {
				let pos = target.offsetTop;

				if (document.querySelector('.school__navbar .scroll-to-anchor')) {
					pos = target.offsetTop - document.querySelector('.school__navbar').offsetHeight;

					if (window.matchMedia('(max-width: 1024px)').matches) {
						pos =
							target.offsetTop - document.querySelector('.school__navbar').offsetHeight - 60;
					}
					if (window.matchMedia('(min-width: 1025px)').matches) {
						pos = target.offsetTop - document.querySelector('.school__navbar').offsetHeight;
					}

					if (
						(target === document.querySelector('#school__info-7') &&
							!target.classList.contains('school__info-7-style-1')) ||
						target === document.querySelector('#school__reviews')
					) {
						pos =
							target.offsetTop -
							document.querySelector('.school__navbar').offsetHeight -
							120;
					}
				}

				window.scrollTo({
					top: pos,
					behavior: 'smooth',
				});
			}
		}
	}
}
