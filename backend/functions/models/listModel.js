const { db } = require('../config/firebase');

/**
 * Represents a list in the system
 * @class List
 * @method createList
 * @method getList
 * @method updateList
 * @method deleteList
 * @method getListsByOwnerId
 * @method getListsBySharedWith
 * @method getListsByTaskId
 * @method getListsByTagId
 */
class List {
	/**
	 * Creates a new List instance
	 * @param {Object} data - The list data
	 * @param {string} data.name - The name of the list
	 * @param {string} data.ownerId - The ID of the list owner
	 * @param {string[]} [data.sharedWith=[]] - Array of user IDs the list is shared with
	 * @param {string} [data.createdAt] - Creation timestamp
	 * @param {string} [data.updatedAt] - Last update timestamp
	 * @param {string[]} [data.tasks=[]] - Array of task IDs in the list
	 */
	constructor(data) {
		this.name = data.name;
		this.ownerId = data.ownerId;
		this.sharedWith = data.sharedWith || [];
		this.createdAt = data.createdAt || new Date().toISOString();
		this.updatedAt = data.updatedAt || new Date().toISOString();
		this.tasks = data.tasks || [];
	}

	/**
	 * Validates the list data
	 * @throws {Error} If validation fails
	 */
	validate() {
		if (!this.name) throw new Error('Name is required');
		if (!this.ownerId) throw new Error('Owner ID is required');
	}

	/**
	 * Converts the list instance to a plain object
	 * @returns {Object} The list data as a plain object
	 */
	toJSON() {
		return {
			name: this.name,
			ownerId: this.ownerId,
			sharedWith: this.sharedWith,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
			tasks: this.tasks,
		};
	}

	/**
	 * Creates a new list in the database
	 * @param {Object} listData - The list data
	 * @returns {Promise<Object>} The created list data
	 */
	static async createList(listData) {
		const list = new List(listData);
		await list.validate();
		const listRef = db.collection('lists').doc();
		await listRef.set(list.toJSON());
		return listRef.id;
	}

	/**
	 * Retrieves a list from the database by its ID
	 * @param {string} listId - The ID of the list to retrieve
	 * @returns {Promise<Object>} The list data
	 */
	static async getList(listId) {
		const listRef = db.collection('lists').doc(listId);
		const list = await listRef.get();
		return {
			id: list.id,
			...list.data(),
		};
	}

	/**
	 * Updates a list in the database
	 * @param {string} listId - The ID of the list to update
	 * @param {Object} listData - The updated list data
	 * @returns {Promise<Object>} The updated list data
	 */
	static async updateList(listId, listData) {
		const list = new List(listData);
		await list.validate();
		const listRef = db.collection('lists').doc(listId);

		return await db.runTransaction(async (transaction) => {
			const listDoc = await transaction.get(listRef);
			if (!listDoc.exists) {
				throw new Error('List not found');
			}

			const updatedData = {
				...list.toJSON(),
				updatedAt: new Date().toISOString(),
			};

			transaction.update(listRef, updatedData);
			return {
				id: listId,
				...updatedData,
			};
		});
	}

	/**
	 * Deletes a list from the database
	 * @param {string} listId - The ID of the list to delete
	 * @returns {Promise<void>}
	 */
	static async deleteList(listId) {
		const listRef = db.collection('lists').doc(listId);
		await listRef.delete();
		return listRef.id;
	}

	/**
	 * Retrieves lists from the database by owner ID
	 * @param {string} ownerId - The ID of the owner to retrieve lists for
	 * @returns {Promise<Array<Object>>} The lists data
	 */
	static async getListsByOwnerId(ownerId) {
		const listsRef = db.collection('lists').where('ownerId', '==', ownerId);
		const lists = await listsRef.get();
		return lists.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	}

	/**
	 * Retrieves lists from the database by shared with
	 * @param {string} email - The email of the shared with to retrieve lists for
	 * @returns {Promise<Array<Object>>} The lists data
	 */
	static async getSharedWithListsByEmail(email) {
		const listsRef = db
			.collection('lists')
			.where('sharedWith', 'array-contains', email);
		const lists = await listsRef.get();
		return lists.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	}

	/**
	 * Retrieves shared with lists from the database by user ID
	 * @param {string} userId - The ID of the user to retrieve lists for
	 * @returns {Promise<Array<Object>>} The lists data
	 */
	static async getSharedWithListsByUserId(userId) {
		const listsRef = db
			.collection('lists')
			.where('sharedWith', 'array-contains', userId);
		const lists = await listsRef.get();
		return lists.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	}

	/**
	 * Retrieves lists from the database by task ID
	 * @param {string} taskId - The ID of the task to retrieve lists for
	 * @returns {Promise<Array<Object>>} The lists data
	 */
	static async getListsByTaskId(taskId) {
		const listsRef = db
			.collection('lists')
			.where('tasks', 'array-contains', taskId);
		const lists = await listsRef.get();
		return lists.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	}

	/**
	 * Retrieves lists from the database by tag ID
	 * @param {string} tagId - The ID of the tag to retrieve lists for
	 * @returns {Promise<Array<Object>>} The lists data
	 */
	static async getListsByTagId(tagId) {
		const listsRef = db.collection('lists').where('tagId', '==', tagId);
		const lists = await listsRef.get();
		return lists.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
	}
}

module.exports = List;
