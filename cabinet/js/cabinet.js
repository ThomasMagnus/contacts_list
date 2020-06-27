window.addEventListener('DOMContentLoaded', () => {
	'use strict'

	const name = document.getElementById('name'),
		  email = document.getElementById('email'),
		  tel = document.getElementById('tel'),
		  btn = document.querySelector('.main__btn'),
		  mainList = document.querySelector('.main__list'),
		  input = document.querySelectorAll('input');

	const generateId = () => `ID${Math.round(Math.random() * 1e8).toString(16)}`;

	let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

	const getElement = () => {
		contacts.forEach(item => {
			const li = document.createElement('li');
			li.classList.add('main__item');
			li. innerHTML = `
				<p class="main__list-name">Имя: ${item.name}</p>
				<p class="main__list-email">Адрес электронной почты: 
					<a href="mailto:${item.email}">${item.email}</a></p> 
				<p class="main__list-tel">Телефон: ${item.tel}</p>
				<button class="main__delete" data-id=${item.id}>x</button>
			`;
	
			mainList.append(li);
		})
	}

	getElement()

	const addContact = () => {

		const contactObj = {
			id: generateId(),
			name: name.value,
			email: email.value,
			tel: tel.value,
		}

		contacts.push(contactObj);

		const li = document.createElement('li');
		li.classList.add('main__item');
		li. innerHTML = `
			<p class="main__list-name">Имя: ${contactObj.name}</p>
			<p class="main__list-email">Адрес электронной почты: 
				<a href="mailto:${contactObj.email}">${contactObj.email}</a></p> 
			<p class="main__list-tel">Телефон: ${contactObj.tel}</p>
			<button class="main__delete" data-id=${contactObj.id}>x</button>
		`;

		mainList.append(li);

		input.forEach(item => {
			item.value = '';
			item.style.border = '';
		})

		localStorage.setItem('contacts', JSON.stringify(contacts));
		
	}

	const deleteContacts = (e) => {
		
		const target = e.target;

		if (target.classList.contains('main__delete')) {
			target.parentElement.remove();
			contacts = contacts.filter(item => {
				if (item.id !== target.dataset.id) {
					return item;
				}
			})
		}
		localStorage.setItem('contacts', JSON.stringify(contacts));
		
	}

	btn.addEventListener('click', addContact)
	mainList.addEventListener('click', deleteContacts)
})