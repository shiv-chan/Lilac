import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';

const validate = (email, password) => {
	const mailValidator = new MailValidator(email);
	const passwordValidator = new PasswordValidator(password);
	return Promise.all([mailValidator.validate(), passwordValidator.validate()]);
};

/**
 * get email address and password.
 */
const onSubmit = async () => {
	let emailInput = document.getElementById('email');
	let passwordInput = documnent.getElementById('password');
	let emailValue = emailInput.value;
	let passwordValue = passwordInput.value;
	const results = await validate(emailValue, passwordValue);
	if (results[0].success && results[1].success) {
		//call login function
	} else if (results[0].success) {
		addErrorMessage('password', result[1].message);
	} else if (result[1].success) {
		addErrorMessage('email', result[0].message);
	} else {
		addErrorMessage('password', result[1].message);
		addErrorMessage('email', result[0].message);
	}
};

const addErrorMessage = (type, message) => {
	let input = document.getElementById(type);
	input.classList.add('is-invalid');
	input.insertAdjacentHTML(
		'afterend',
		`<div class='invalid-feedback'>${message}</div>`
	);
};

{
	const submit = document.getElementById('submit');
	submit.addEventListener('click', onSubmit);
}
