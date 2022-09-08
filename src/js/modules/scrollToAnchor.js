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

				window.scrollTo({
					top: pos,
					behavior: 'smooth',
				});
			}
		}
	}
}
