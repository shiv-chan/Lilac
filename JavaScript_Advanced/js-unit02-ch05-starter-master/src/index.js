import Polyglot from 'node-polyglot';

class TranslationApp {
	constructor() {
		this.polyglot = new Polyglot();
		this.currentLocale = localStorage.getItem('locale') || 'ja';
	}

	/**
	 * Set a message to polyglot according to the current locale.
	 * Use polyglot.extend() to set a message.
	 */
	setup() {
		// 💡 need to add if statement.
		// i.e. if locale is ja, return こんにちは、世界. otherwise, return Hello world
		// Polyglot package, documentation -> check Polyglot's syntax (i.e. .extend() etc)
		if (this.currentLocale === 'ja') {
			this.polyglot.extend({
				ja: 'こんにちは、世界',
			});
		} else if (this.currentLocale === 'en') {
			this.polyglot.extend({
				en: 'Hello, World',
			});
		}

		return this.polyglot.t(this.currentLocale);
	}

	/**
	 * Update the current locale according to data-local attribute in buttons.
	 */
	updateLocale(e) {
		app.currentLocale = e.target.dataset.locale;
		localStorage.setItem('locale', app.currentLocale);
		// 💡 func showMessage is in a same scope with this func, updateLocale -> this.showMessage
		app.showMessage();
	}

	/**
	 * Show the message under the element with id named 'main' with h1 tag.
	 * This message should change by the current locale.
	 */
	showMessage() {
		const main = document.querySelector('#main');
		if (main.querySelector('h1') == null) {
			let h1 = document.createElement('h1');
			this.setH1(h1, main);
		} else {
			let h1 = main.querySelector('h1');
			this.setH1(h1, main);
		}
	}

	setH1(h1, main) {
		h1.innerHTML = this.setup();
		main.append(h1);
	}
}

/** instantiate Class TranslationApp */
const app = new TranslationApp();
app.showMessage();

{
	const button1 = document.getElementById('button1');
	button1.addEventListener('click', app.updateLocale);

	const button2 = document.getElementById('button2');
	button2.addEventListener('click', app.updateLocale);
}
