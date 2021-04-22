import BaseValidator from './BaseValidator';

class MailValidator extends BaseValidator {
	constructor(value) {
		super(value, 'Email Address'); //order of argument?
		this._checkFormat = this._checkFormat.bind(this);
	}

	validate() {
		return super
			._cannnotEmpty()
			.then(this._checkFormat) //this._checkFormat()?
			.then((res) => {
				success: true;
			})
			.catch((err) => err);
	}

	_checkFormat() {
		const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
		const test = re.test(this.value);

		if (test) {
			return Promise.resolve();
		} else {
			return Promise.reject({
				success: false,
				message: `The format of ${this.type} is wrong.`,
			});
		}
	}
}
