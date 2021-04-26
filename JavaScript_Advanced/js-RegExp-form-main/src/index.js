import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';
import NameValidator from './lib/NameValidator';
import UsernameValidator from './lib/UsernameValidator';
import 'whatwg-fetch';

const endpoint = 'http://localhost:3000';

const validate = (params) => {
	const name = params.name;
	const email = params.email;
	const password = params.password;
	const username = params.username;
	const mailValidator = new MailValidator(email);
	const passwordValidator = new PasswordValidator(password);
	const nameValidator = new NameValidator(name);
	const usernameValidator = new UsernameValidator(username);
	return Promise.all([
		nameValidator.validate(),
		usernameValidator.validate(),
		mailValidator.validate(),
		passwordValidator.validate(),
	]);
};

const removeErrors = () => {
	return new Promise((resolve) => {
		document.querySelectorAll('.is-invalid').forEach((el) => {
			el.classList.remove('is-invalid');
		});
		document.querySelectorAll('.invalid-feedback').forEach((el) => {
			el.parentNode.removeChild(el);
		});
		resolve();
	});
};

const addErrorMessage = (type, message) => {
	let input = document.getElementById(type);
	input.classList.add('is-invalid');
	input.insertAdjacentHTML(
		'afterend',
		`<div class="invalid-feedback">${message}</div>`
	);
};

const signup = (params) => {
	return fetch(`${endpoint}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json; charset=utf-8',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: params.name,
			username: params.username,
			email: params.email,
			password: params.password,
		}),
	}).then((res /* =response */) => {
		const json = res.json(); // response bodyを取り出して、JSON(=object)に変換して返す

		// json === { "message": "ユーザー登録成功！" }

		if (res.status === 200) {
			// 登録成功
			return json;
		} else {
			// 登録失敗
			return Promise.reject(new Error('ユーザー登録失敗'));
		}
	});
};

// 「登録する」ボタンをクリックす度に呼ばれる関数・イベントハンドラ
const onSubmit = async () => {
	await removeErrors();
	const params = {
		email: document.querySelector('#email').value,
		password: document.querySelector('#password').value,
		username: document.querySelector('#username').value,
		name: document.querySelector('#name').value,
	};

	const results = await validate(params);
	console.log(`🚀 ~ onSubmit ~ results`, results);
	// ここでなんか色々やって、isEveryValidがtrueかfalseかを決める
	let isAllValid;
	for (let result of results) {
		if (result.success) {
			isAllValid = true;
		} else {
			isAllValid = false;
		}
	}

	// trueはただ仮置きされているだけ
	// ここのif文が正しくなるなるように変更が必要
	if (isAllValid /* バリデーション成功時 */) {
		signup(params) // promise
			.then((json) => {
				alert(json.message);
			})
			.catch((err) => {
				alert(err.message);
			});
	} else {
		// ここも自分で何を渡すべきか考えて、引数として渡してあげる
		// addErrorMessage() が何を求めているかを見てみる
		let type;
		let message;
		for (let result of results) {
			if (!result.success) {
				type = result.type;
				message = result.message;
				/* エラーメッセージを出力 */
				addErrorMessage(type, message);
			}
		}
	}
};

{
	const submit = document.getElementById('submit');
	submit.addEventListener('click', onSubmit);
}
