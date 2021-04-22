class BaseValidator {
	constructor(type, value) {
		this.type = type; //email address or password
		this.value = value;
	}

	_cannnotEmpty() {
		return new Promise((resolve, reject) => {
			if (!!this.value) {
				resolve();
			} else {
				reject({
					success: false,
					message: `${this.type} is required.`,
				});
			}
		});
	}
}

export default BaseValidator;
