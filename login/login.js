function login(username, password) {
	console.log({ username, password });
	// fake login

	localStorage.setItem(
		'credentials',
		JSON.stringify({ username, password })
	);

	document.location = './login.html';
}

function clickHandler() {
	console.log('click happened');
	const usernameInput = document.querySelector('#username');
	const passwordInput = document.querySelector('#password');

	const username = usernameInput.value;
	const password = passwordInput.value;

	login(username, password);
}

function showSignup(){
	document.querySelector('#sign-in').classList.add('hidden');
	document.querySelector('#sign-up').classList.remove('hidden');
}

function createAccountClick(){
	const usernameInput = document.querySelector('#sign-up-username');
	const passwordInput = document.querySelector('#sign-up-password');
	const emailInput = document.querySelector('#sign-up-email');
	const genderInput = document.querySelector('#sign-up-gender');
	
	const username = usernameInput.value;
	const password = passwordInput.value;
	const email = emailInput.value;
	const gender = genderInput.value;
	const month = monthInput.value;
	const day = dayInput.value;
	const year = yearInput.value;
	
	//..

	const dob = month + '/' + day + '/' + year;
	
	createAccount(username, email, password, gender, dob);
}

const users = localStorage.getItem('users') || [];

function createAccount(username, email, password, gender, dob){
	const found = users.find(x => x.username === username);
	if(found) return { error: 'user already exists' };

	users.push({ username, email, password, gender, dob });

	// save new account to database
	localStorage.setItem(
		'users',
		JSON.stringify(users)
	);
	
	return { success: true };
}
