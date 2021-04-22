import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
	constructor(val) {
		super(val, 'Password'); //order of argument?
		this._checkLength = this._checkLength.bind(this);
	}

	validate() {
		return super
			._cannnotEmpty()
			.then(this._checkLength) //this._checkLegth()?
			.then((res) => {
				success: true;
			})
			.catch((err) => err);
	}

	_checkLength() {
		if (this.val.length >= 8) {
			return Promise.resolve();
		} else {
			return Promise.reject({
				success: false,
				message: `Password is too short.`,
			});
		}
	}
}
