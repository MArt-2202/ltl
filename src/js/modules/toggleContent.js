export default function toggleContent() {
	document.addEventListener('click', toggleFunc());

	function toggleFunc() {
		return function (e) {
			const target = e.target,
				toggleWr = document.querySelector('.toggle-wrapper'),
				toggleBtn = document.querySelector('.toggle-btn'),
				toggleBtnEl = document.querySelectorAll('.toggle-btn span'),
				toggleContent = document.querySelector('.toggle-wrapper > div'),
				overlay = document.querySelector('.overlay');

			for (let i = 0; i < toggleBtnEl.length; i++) {
				if (target == toggleBtnEl[i]) {
					toggleBtn.classList.toggle('toggle-btn-style');
					toggleContent.classList.toggle('content-visible');
					overlay.classList.toggle('overlay-visible');

					if (document.querySelector('.toggle-btn-style')) {
						document.body.style.paddingRight =
							window.innerWidth - document.documentElement.clientWidth + 'px';
						document.body.style.overflowY = 'hidden';
					} else {
						if (!document.querySelector('.modal-overlay.show')) {
							document.body.style.overflowY = '';
							document.body.style.paddingRight = '';
						}
					}
				}
			}

			if (target == toggleWr || target == toggleBtn) {
				toggleBtn.classList.toggle('toggle-btn-style');
				toggleContent.classList.toggle('content-visible');
				overlay.classList.toggle('overlay-visible');
				if (document.querySelector('.toggle-btn-style')) {
					document.body.style.paddingRight =
						window.innerWidth - document.documentElement.clientWidth + 'px';
					document.body.style.overflowY = 'hidden';
				} else {
					if (!document.querySelector('.modal-overlay.show')) {
						document.body.style.overflowY = '';
						document.body.style.paddingRight = '';
					}
				}
			}

			if (!target.closest('.toggle-wrapper')) {
				toggleBtn.classList.remove('toggle-btn-style');
				toggleContent.classList.remove('content-visible');
				overlay.classList.remove('overlay-visible');

				if (
					!document.querySelector('.modal-overlay.show') &&
					window.matchMedia('(max-width: 1200px)').matches
				) {
					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';
				}
			}

			if (
				document.querySelector('.toggle-wrapper-2') &&
				document.querySelector('.toggle-wrapper-2 > div') &&
				document.querySelector('.toggle-btn-2')
			) {
				const toggleWr2 = document.querySelector('.toggle-wrapper-2'),
					toggleContent2 = document.querySelector('.toggle-wrapper-2 > div'),
					toggleBtn2 = document.querySelector('.toggle-btn-2');

				if (target == toggleWr2 || target == toggleBtn2) {
					toggleBtn2.classList.toggle('toggle-btn-2-style');
					toggleContent2.classList.toggle('content-visible');

					if (document.querySelector('.toggle-btn-2-style')) {
						document.body.style.paddingRight =
							window.innerWidth - document.documentElement.clientWidth + 'px';
						document.body.style.overflowY = 'hidden';
					} else {
						document.body.style.overflowY = '';
						document.body.style.paddingRight = '';
					}
				}

				if (
					!target.closest('.toggle-wrapper-2') &&
					!document.querySelector('.toggle-btn-style')
				) {
					toggleBtn2.classList.remove('toggle-btn-2-style');
					toggleContent2.classList.remove('content-visible');

					document.body.style.overflowY = '';
					document.body.style.paddingRight = '';
				}
			}
		};
	}
}
