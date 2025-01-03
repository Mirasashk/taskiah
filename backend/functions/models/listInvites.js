const { db } = require('../config/firebase');
const { FieldValue } = require('firebase-admin/firestore');

/**
 * Represents a list in the system
 * @class List
 * @method createListInvite
 */

/**
 * Represents a list invite in the system
 * @class ListInvite
 * @method createListInvite
 * @method getListInviteByEmail
 * @method deleteListInvite
 * @method updateListInvite
 * @method getAllListInvites
 * @method getListInviteById
 * @method getListInviteByListId
 * @method getListInviteByEmailAndListId
 * @method acceptListInvite
 */
class ListInvite {
	/**
	 * Creates a new ListInvite instance
	 * @param {Object} data - The list invite data
	 * @param {string} data.email - The email of the invitee
	 * @param {string} data.listId - The ID of the list
	 * @param {string} data.message - The message of the invite
	 * @param {boolean} [data.accepted=false] - Whether the invite has been accepted
	 */
	constructor(data) {
		this.email = data.email;
		this.listId = data.listId;
		this.message = data.message;
		this.accepted = data.accepted || false;
		this.status = data.status || 'pending';
	}

	/**
	 * Validates the list invite data
	 * @throws {Error} If validation fails
	 */
	validate() {
		if (!this.email) throw new Error('Email is required');
		if (!this.listId) throw new Error('List ID is required');
		if (!this.message) throw new Error('Message is required');
	}

	/**
	 * Converts the list invite instance to a plain object
	 * @returns {Object} The list invite data as a plain object
	 */
	toJSON() {
		return {
			email: this.email,
			listId: this.listId,
			message: this.message,
			accepted: this.accepted,
			status: this.status,
		};
	}

	/**
	 * Creates a new list invite
	 * @param {Object} data - The list invite data
	 * @returns {Promise<Object>} The created list invite
	 */
	static async createListInvite(data) {
		const listInvite = new ListInvite(data);
		await listInvite.validate();
		const docRef = await db
			.collection('listInvites')
			.add(listInvite.toJSON());
		return { id: docRef.id, ...listInvite.toJSON() };
	}

	/**
	 * Gets a list invite by email
	 * @param {string} email - The email of the invitee
	 * @returns {Promise<Object>} The list invite
	 */
	static async getListInviteByEmail(email) {
		const listInvites = await db
			.collection('listInvites')
			.where('email', '==', email)
			.where('accepted', '==', false)
			.where('status', '==', 'pending')
			.get();

		// Get all invites data and fetch corresponding lists
		const invitesWithLists = await Promise.all(
			listInvites.docs.map(async (doc) => {
				const inviteData = doc.data();
				const listDoc = await db
					.collection('lists')
					.doc(inviteData.listId)
					.get();
				return {
					id: doc.id,
					...inviteData,
					list: listDoc.exists ? listDoc.data() : null,
				};
			})
		);

		return invitesWithLists;
	}

	/**
	 * Deletes a list invite
	 * @param {string} id - The ID of the list invite
	 * @returns {Promise<void>}
	 */
	static async deleteListInvite(id) {
		await db.collection('listInvites').doc(id).delete();
	}

	/**
	 * Updates a list invite
	 * @param {string} id - The ID of the list invite
	 * @param {Object} data - The updated list invite data
	 * @returns {Promise<void>}
	 */
	static async updateListInvite(id, data) {
		await db.collection('listInvites').doc(id).update(data);
	}

	/**
	 * Gets all list invites
	 * @returns {Promise<Object[]>} The list invites
	 */
	static async getAllListInvites() {
		const listInvites = await db.collection('listInvites').get();
		return listInvites.docs.map((doc) => doc.data());
	}

	/**
	 * Gets a list invite by ID
	 * @param {string} id - The ID of the list invite
	 * @returns {Promise<Object>} The list invite
	 */
	static async getListInviteById(id) {
		const listInvite = await db.collection('listInvites').doc(id).get();
		return listInvite.data();
	}

	/**
	 * Gets a list invite by list ID
	 * @param {string} listId - The ID of the list
	 * @returns {Promise<Object>} The list invite
	 */
	static async getListInviteByListId(listId) {
		const listInvite = await db
			.collection('listInvites')
			.where('listId', '==', listId)
			.get();
		return listInvite.docs.map((doc) => doc.data());
	}

	/**
	 * Gets a list invite by email and list ID
	 * @param {string} email - The email of the invitee
	 * @param {string} listId - The ID of the list
	 * @returns {Promise<Object>} The list invite
	 */
	static async getListInviteByEmailAndListId(email, listId) {
		const listInvite = await db
			.collection('listInvites')
			.where('email', '==', email)
			.where('listId', '==', listId)
			.get();
		return listInvite.docs.map((doc) => doc.data());
	}

	/**
	 * Accepts a list invite
	 * @param {string} id - The ID of the list invite
	 * @returns {Promise<void>}
	 */
	static async acceptListInvite(inviteId, listId, userId) {
		await db
			.collection('listInvites')
			.doc(inviteId)
			.update({ accepted: true, status: 'accepted' })
			.then(async () => {
				await db
					.collection('lists')
					.doc(listId)
					.update({
						sharedWith: FieldValue.arrayUnion(userId),
					});
			})
			.catch((error) => {
				console.error('Error accepting list invite', error);
				throw error;
			});
	}

	/**
	 * Rejects a list invite
	 * @param {string} id - The ID of the list invite
	 * @returns {Promise<void>}
	 */
	static async rejectListInvite(id) {
		await db
			.collection('listInvites')
			.doc(id)
			.update({ accepted: true, status: 'rejected' });
	}
}

module.exports = ListInvite;
