export default function accordion() {
	if (document.querySelector('.accordion')) {
		document.querySelectorAll('.accordion').forEach((el) => {
			el.addEventListener('click', function (e) {
				if (e.target.closest('.accordion__title')) {
					toogleItem(e.target.closest('.accordion__title'));
				}
			});
		});
		function toogleItem(title) {
			const wrapper = title.closest('.accordion'),
				titles = wrapper.querySelectorAll('.accordion__title'),
				answer = title.nextElementSibling;
			if (answer.classList.contains('accordion__content')) {
				if (answer.classList.contains('open')) {
					answer.style.height = answer.clientHeight + 'px';
					const animate = answer.animate([{ height: 0 }], { duration: 200 });
					animate.addEventListener('finish', function () {
						title.classList.toggle('open');
						answer.removeAttribute('style');
						answer.classList.remove('open');
					});
				} else {
					titles.forEach((item) => {
						if (item === title) {
							answer.classList.add('open');
							title.classList.toggle('open');
							const realHeight = answer.clientHeight;
							answer.style.height = 0;
							let animate = answer.animate([{ height: realHeight + 'px' }], {
								duration: 200,
							});
							animate.addEventListener('finish', function () {
								answer.removeAttribute('style');
							});
						} else {
							item.nextElementSibling.style.height =
								item.nextElementSibling.clientHeight + 'px';
							const animate = item.nextElementSibling.animate([{ height: 0 }], {
								duration: 100,
							});
							animate.addEventListener('finish', function () {
								item.classList.remove('open');
								item.nextElementSibling.removeAttribute('style');
								item.nextElementSibling.classList.remove('open');
							});
						}
					});
				}
			}
		}
	}
}
