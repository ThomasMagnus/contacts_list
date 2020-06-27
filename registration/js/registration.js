window.addEventListener('DOMContentLoaded', () => {
	'use strict'

	const mainForm = document.querySelector('.main__form'),
		  login = document.getElementById('login'),
		  pass = document.getElementById('pass'),
		  passTwo = document.getElementById('passTwo'),
		  error = document.querySelector('.error'),
		  modal = document.querySelector('.modal'),
		  input = document.querySelectorAll('input');

	const errorPassTxt = document.createElement('p')
	errorPassTxt.innerHTML = `<p class="error errorPass">* Пароли не совпадают</p>`;
	
	const textError = document.createElement('p');

	textError.textContent = '* Все поля обязательны для заполнения';
	textError.classList.add('errorTxt');
		

	const getValid = () => {

		if (pass.value == '' || passTwo.value == '' || login.value == '') {
		
			mainForm.append(textError);

			input.forEach(item => {
				if (item.value == '') {
					item.style.border = `1px solid red`;
				}
			})
			
			return true;
			
		} else {
			textError.remove();
			input.forEach(item => item.style.border = '')
		}

		if (pass.value.length < 6) {

			pass.style.border = `1px solid red`;
			error.style.display = 'block'

			return true;

		} else {
			error.style.display = 'none'
		}
		
		if (pass.value !== passTwo.value) {

			mainForm.append(errorPassTxt);

			pass.style.border = `1px solid red`;
			passTwo.style.border = `1px solid red`;
			
			return true;
			
		} else {
			errorPassTxt.remove();
		}
	}

	const registrationUsers = (e) => {
		e.preventDefault();

		const users = {
			login: login.value,
			pass:  pass.value,
		}

		const json = JSON.stringify(users);

		if (!getValid()) {

			const spinner = document.createElement('img');
				spinner.src = 'img/spinner.svg';
				spinner.classList.add('main__spinner');
				mainForm.append(spinner);

			fetch('https://users-fafb5.firebaseio.com/users.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: json,
			})
			.then(data => data.json())
			.then(response => {
				users.id = response.name;

				pass.style.border = '';
				passTwo.style.border = '';
				error.style.display = 'none';

				mainForm.reset();
				spinner.remove();

			}) 
			.then(() => {
				modal.style.display = 'block';
				setTimeout(() => modal.style.display = '', 2000)
			})
			.then(() => window.location = "http://usercabinet/cabinet/cabinet.html")
			.catch(err => console.log(err))
		}
	}
	
	mainForm.addEventListener('submit', registrationUsers);
})