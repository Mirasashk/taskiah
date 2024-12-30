class User {
	constructor(data) {
		this.id = data.id;
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.username = data.username || '';
		this.photoURL = data.photoURL || '';
		this.role = data.role || 'user';
		this.createdAt = data.createdAt || new Date().toISOString();
		this.updatedAt = data.updatedAt || new Date().toISOString();
		this.extraInfo = data.extraInfo || {};
		this.publicBiometricKey = data.publicBiometricKey || '';
	}

	validate() {
		// Required fields validation
		if (!this.id) throw new Error('ID is required');
		if (!this.firstName) throw new Error('First Name is required');
		if (!this.lastName) throw new Error('Last Name is required');
		if (!this.email) throw new Error('Email is required');
		if (!this.username) throw new Error('Username is required');
		if (!this.role) throw new Error('Role is required');

		// Validate extraInfo format
		if (this.extraInfo) {
			if (typeof this.extraInfo !== 'object') {
				throw new Error('extraInfo must be an object');
			}
			if (
				this.extraInfo.phone &&
				typeof this.extraInfo.phone !== 'string'
			) {
				throw new Error('Phone must be a string');
			}
			if (this.extraInfo.preferences) {
				if (typeof this.extraInfo.preferences !== 'object') {
					throw new Error('Preferences must be an object');
				}
				if (
					this.extraInfo.preferences.theme &&
					typeof this.extraInfo.preferences.theme !== 'string'
				) {
					throw new Error('Theme must be a string');
				}
			}
		}

		return true;
	}

	toJSON() {
		return {
			id: this.id,
			email: this.email,
			firstName: this.firstName,
			lastName: this.lastName,
			username: this.username,
			photoURL: this.photoURL,
			role: this.role,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			extraInfo: this.extraInfo,
			publicBiometricKey: this.publicBiometricKey,
		};
	}
}

module.exports = User;
