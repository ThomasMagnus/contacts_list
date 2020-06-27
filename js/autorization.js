window.addEventListener('DOMContentLoaded', () => {
	'use strict'

	const autorizBtn = document.querySelector('.autoriz'),
		  input = document.querySelectorAll('input');

	const inputName = document.getElementById('input__name'),
		  inputPass = document.getElementById('input__pass');

	
	const notUsers = document.createElement('p')
	notUsers.style.cssText = `
		font-size: 12px;
		color: red;
	`;
	notUsers.textContent = '* Неверное имя пользователя или пароль'

	const getAutorization = (e) => {

		const getValidate = (style) => {

			input.forEach(item => {
				if (item.value == '') {
					item.style.border = style;
				}
			})
		}

		e.preventDefault();

		if (inputName.value == '' || inputPass.value == '') {

			getValidate(`1px solid red`);

			return;

			
		} else {

			getValidate('');

			fetch('https://users-fafb5.firebaseio.com/users.json')
				.then(data => data.json())
				.then(response => {
					for (let key in response) {
						if (inputName.value !== response[key].login || inputPass.value !== response[key].pass) {
							autorizBtn.before(notUsers);
						} else {
							window.location = "http://usercabinet/cabinet/cabinet.html";
							notUsers.remove();
						}
					}
				});
		}
	}

	autorizBtn.addEventListener('click', getAutorization);
})