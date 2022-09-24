export default function tabs({
	tabsList = '.tabs',
	tabsContent = '.tabs__content > div',
	tabsListItem = '.tabs__list > li',
	activeClass = 'active',
	activeIndex = 0,
}) {
	document.querySelectorAll(tabsList).forEach((tab) => {
		const content = tab.querySelectorAll(tabsContent),
			listItem = tab.querySelectorAll(tabsListItem);

		function hideTabContent() {
			content.forEach((el) => (el.style.display = 'none'));
			listItem.forEach((el) => el.classList.remove(activeClass));
		}

		function showTabContent(i = activeIndex) {
			content[i].style.display = 'block';
			listItem[i].classList.add(activeClass);
		}

		hideTabContent();
		showTabContent();

		tab.addEventListener('click', (e) => {
			const target = e.target;

			listItem.forEach((el, index) => {
				if (target === el || target.parentElement == el) {
					hideTabContent();
					showTabContent(index);
				}
			});
		});
	});
}
