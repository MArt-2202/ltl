export default function blockStyles() {
	if (document.querySelector('h2')) {
		document.querySelectorAll('h2').forEach((el) => {
			if (el.nextElementSibling?.tagName === 'SPAN') {
				el.classList.add('title-1');
			}
		});
	}
}
