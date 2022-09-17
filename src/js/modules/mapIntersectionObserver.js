import mapWithPins from './mapWithPins';

export default function mapIntersectionObserver(node) {
	if (node) {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						mapWithPins(node);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: '50px',
			}
		);
		document.querySelectorAll(node).forEach((item) => observer.observe(item));
	}
}
