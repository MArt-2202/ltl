export default function digitsCounter(node) {
	if (node) {
		function digitsCounterAnimate(digitItem) {
			let startTimestamp = null;
			const duration = parseInt(digitItem.dataset.duration)
					? parseInt(digitItem.dataset.duration)
					: 1000,
				startValue = parseInt(digitItem.dataset.counter),
				startPosition = 0,
				step = (timestamp) => {
					if (!startTimestamp) startTimestamp = timestamp;
					const progress = Math.min((timestamp - startTimestamp) / duration, 1);

					digitItem.innerHTML = Math.floor(progress * (startPosition + startValue));

					if (digitItem.dataset.counteradd) {
						digitItem.innerHTML += digitItem.dataset.counteradd;
					}

					if (progress < 1) {
						window.requestAnimationFrame(step);
					}
				};
			window.requestAnimationFrame(step);
		}

		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						digitsCounterAnimate(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.5,
			}
		);
		document.querySelectorAll(node).forEach((item) => observer.observe(item));
	}
}
