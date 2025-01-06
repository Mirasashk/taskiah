const { db } = require('../config/firebase');
const List = require('./listModel');

/**
 * Represents a user in the system
 * @class User
 * @method createUser
 * @method getUser
 * @method updateUser
 * @method deleteUser
 * @method getUsersByRole
 */
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
	}

	/**
	 * Validates the user data
	 * @throws {Error} If validation fails
	 * @returns {boolean} Returns true if validation passes
	 */
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

	/**
	 * Converts the user instance to a plain object
	 * @returns {Object} The user data as a plain object
	 */
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
		};
	}

	/**
	 * Creates a new user in the database
	 * @param {Object} userData - The user data
	 * @returns {Promise<string>} The ID of the created user
	 */
	static async createUser(userData) {
		for (const key in userData) {
			if (typeof userData[key] === 'string') {
				if (key !== 'id') {
					userData[key] = userData[key].toLowerCase();
				}
			}
		}

		const user = new User(userData);
		// make all fields lowercase

		await user.validate();
		const userRef = db.collection('users').doc(userData.id);
		await userRef.set(user.toJSON());

		// Create master list with proper initialization
		const masterList = new List({
			name: 'My Tasks',
			ownerId: userRef.id,
			sharedWith: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			tasks: [], // Initialize empty tasks array
		});

		await List.createList(masterList.toJSON());
		return userRef.id;
	}

	/**
	 * Retrieves a user from the database by their ID
	 * @param {string} userId - The ID of the user to retrieve
	 * @returns {Promise<Object>} The user data
	 */
	static async getUser(userId) {
		const userRef = db.collection('users').doc(userId);
		const user = await userRef.get();
		return user.data();
	}

	/**
	 * Updates a user in the database
	 * @param {string} userId - The ID of the user to update
	 * @param {Object} userData - The updated user data
	 * @returns {Promise<Object>} The updated user data
	 */
	static async updateUser(userId, userData) {
		const userRef = db.collection('users').doc(userId);
		await userRef.update({ ...userData, updatedAt: new Date() });
		const userDoc = await userRef.get();
		return userDoc.data();
	}

	/**
	 * Deletes a user from the database
	 * @param {string} userId - The ID of the user to delete
	 * @returns {Promise<void>}
	 */
	static async deleteUser(userId) {
		const userRef = db.collection('users').doc(userId);
		await userRef.delete();
	}

	/**
	 * Retrieves users from the database by role
	 * @param {string} role - The role to retrieve users for
	 * @returns {Promise<Array<Object>>} The users data
	 */
	static async getUsersByRole(role) {
		const usersRef = db.collection('users').where('role', '==', role);
		const users = await usersRef.get();
		return users.docs.map((doc) => doc.data());
	}

	/**
	 * Searches for users
	 * @param {string} query - The query to search for
	 * @returns {Promise<Array<Object>>} The users data
	 */
	static async searchUsers(query) {
		const queryLower = query.toLowerCase();
		const usersRef = db
			.collection('users')
			.where('email', '>=', queryLower)
			.where('email', '<=', queryLower + '\uFFFF');
		const users = await usersRef.get();
		return users.docs.map((doc) => doc.data());
	}
}

module.exports = User;
