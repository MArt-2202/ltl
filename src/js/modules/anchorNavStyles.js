export default function anchorNavStyles(node, nav) {
	if (document.querySelector(node) && document.querySelector(nav)) {
		const sections = document.querySelectorAll(node);
		const links = document.querySelector(nav).querySelectorAll('a');

		const cb = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					links.forEach((link) => link.classList.remove('active'));

					if (entry.target.id) {
						const activeId = entry.target.id,
							activeLink = document.querySelector(`[href="#${activeId}"]`);

						if (activeLink) {
							activeLink.classList.add('active');
						}
					}
				}
			});
		};

		const sectionObserver = new IntersectionObserver(cb, {
			rootMargin: `-100px`,
		});

		sections.forEach((sec) => {
			sectionObserver.observe(sec);
		});
	}
}
