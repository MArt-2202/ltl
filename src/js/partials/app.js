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

				// console.log(name.value);
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
				const mas_form = {
					tel: tel.value,
					name: name.value,
					email: email.value,
					msg: msg.value,
				};

				let data = new FormData();
				data.append('json', JSON.stringify(mas_form));

				fetch('/s/send', {
					method: 'POST',
					body: data,
				})
					.then((response) => {
						if (response.ok) {
							document.querySelector('#form-form-result').classList.remove('dn');
						}
					})
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.log(error);
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
