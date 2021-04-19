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
		this.polyglot.extend({
			ja: 'こんにちは、世界',
			en: 'Hello, World',
		});

		return this.polyglot.t(this.currentLocale);
	}

	/**
	 * Update the current locale according to data-local attribute in buttons.
	 */
	updateLocale(e) {
		this.currentLocale = e.target.dataset.locale;
    localStorage.setItem('locale', this.currentLocale);
		app.showMessage();
	}

	/**
	 * Show the message under the element with id named 'main' with h1 tag.
	 * This message should change by the current locale.
	 */
	showMessage() {
		const main = document.querySelector('#main');
		const h1 = document.createElement('h1');
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
