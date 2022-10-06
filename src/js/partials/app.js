'use strict';

document.addEventListener('DOMContentLoaded', () => {
	if (
		document.querySelector('#order-form__name') &&
		document.querySelector('#order-form__tel') &&
		document.querySelector('#order-form__email') &&
		document.querySelector('#order-form__message') &&
		document.querySelector('#order-form__submit')
	) {
		const name = document.querySelector('#order-form__name'),
			tel = document.querySelector('#order-form__tel'),
			email = document.querySelector('#order-form__email'),
			msg = document.querySelector('#order-form__message'),
			options = {
				method: 'POST',
				body: {
					tel: '',
					name: '',
					email: '',
					msg: '',
				},
			};

		document.querySelector('#order-form__submit').addEventListener('click', function (e) {
			if (name.value === '') {
				document
					.querySelector('#order-form__name')
					?.closest('.required-field')
					.classList.add('required');
			} else {
				options.body.name = name.value;

				document
					.querySelector('#order-form__name')
					?.closest('.required-field')
					.classList.remove('required');

				console.log(name.value);
			}
			if (tel.value === '') {
				document
					.querySelector('#order-form__tel')
					?.closest('.required-field')
					.classList.add('required');
			} else {
				options.body.tel = tel.value;

				document
					.querySelector('#order-form__tel')
					?.closest('.required-field')
					.classList.remove('required');
			}
			if (email.value === '') {
				document
					.querySelector('#order-form__email')
					?.closest('.required-field')
					.classList.add('required');
			} else {
				options.body.email = email.value;

				document
					.querySelector('#order-form__email')
					?.closest('.required-field')
					.classList.remove('required');
			}
			if (msg.value === '') {
				document
					.querySelector('#order-form__message')
					?.closest('.required-field')
					.classList.add('required');
			} else {
				options.body.msg = msg.value;

				document
					.querySelector('#order-form__message')
					?.closest('.required-field')
					.classList.remove('required');
			}

			if (name.value !== '' && tel.value !== '' && email.value !== '' && msg.value !== '') {
				fetch('/s/send', options)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Error response');
						}
						return response.json();
					})
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					});

				if (document.querySelector('.res_form_support')) {
					document.querySelector('.res_form_support').classList.remove('dn');
				}
				if (document.querySelector('#customerrservice-form__tel')) {
					document.querySelector('#customerrservice-form__tel').value = '';
				}
				if (document.querySelector('#customerrservice-form__message')) {
					document.querySelector('#customerrservice-form__message').value = '';
				}
			}
		});
	}
}); // END READY
