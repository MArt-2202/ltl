export default function backToTop() {
	if (document.querySelector('#back-to-top')) {
		if ('scrollBehavior' in document.documentElement.style) {
			document.querySelector('#back-to-top').addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			});
		}
	}
}
